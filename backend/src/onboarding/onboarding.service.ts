import { Injectable } from '@nestjs/common';
import { MacroTargets } from '../shared/types';

export interface OnboardingData {
  gender: 'male' | 'female' | 'other';
  height: number; // cm
  weight: number; // kg
  targetWeight?: number; // kg
  birthDate: string; // YYYY-MM-DD
  workoutsPerWeek: number; // 0-2, 3-5, 6+
  goal: 'weight_loss' | 'muscle_gain' | 'maintenance';
}

export interface OnboardingRecommendations {
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fats: number; // grams
  estimatedDays?: number;
  projectedDate?: string;
}

@Injectable()
export class OnboardingService {
  /**
   * Calculate age from birth date
   */
  private calculateAge(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  /**
   * Map workouts per week to activity level
   */
  private mapWorkoutsToActivityLevel(workoutsPerWeek: number): 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active' {
    if (workoutsPerWeek <= 2) return 'sedentary';
    if (workoutsPerWeek <= 5) return 'light';
    return 'moderate';
  }

  /**
   * Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor equation
   */
  private calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female' | 'other'): number {
    // For 'other', use average of male/female
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
      // Average of male and female formulas
      const maleBMR = 10 * weight + 6.25 * height - 5 * age + 5;
      const femaleBMR = 10 * weight + 6.25 * height - 5 * age - 161;
      return (maleBMR + femaleBMR) / 2;
    }
  }

  /**
   * Calculate TDEE (Total Daily Energy Expenditure)
   */
  private calculateTDEE(bmr: number, activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'): number {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };
    return bmr * multipliers[activityLevel];
  }

  /**
   * Adjust calories based on goal
   */
  private adjustCaloriesForGoal(tdee: number, goal: 'weight_loss' | 'muscle_gain' | 'maintenance'): number {
    switch (goal) {
      case 'weight_loss':
        return Math.max(1200, Math.round(tdee - 500)); // Minimum 1200 safety floor
      case 'muscle_gain':
        return Math.round(tdee + 500); // 500 cal surplus
      case 'maintenance':
      default:
        return Math.round(tdee);
    }
  }

  /**
   * Calculate macronutrient targets
   */
  private calculateMacros(calories: number, weight: number, goal: 'weight_loss' | 'muscle_gain' | 'maintenance'): {
    protein: number;
    carbs: number;
    fats: number;
  } {
    // Protein: 1.6-2.2g per kg (higher for muscle gain)
    let proteinPerKg = 1.8;
    if (goal === 'muscle_gain') {
      proteinPerKg = 2.2;
    } else if (goal === 'weight_loss') {
      proteinPerKg = 2.0; // Higher protein for weight loss to preserve muscle
    }
    const protein = Math.round(weight * proteinPerKg);

    // Fats: 0.8-1g per kg (minimum 20% of calories)
    const fatsPerKg = 0.9;
    const fats = Math.round(weight * fatsPerKg);
    const fatCalories = fats * 9;

    // Carbs: remaining calories
    const proteinCalories = protein * 4;
    const remainingCalories = calories - proteinCalories - fatCalories;
    const carbs = Math.max(0, Math.round(remainingCalories / 4));

    return {
      protein,
      carbs,
      fats,
    };
  }

  /**
   * Calculate daily recommendations based on onboarding data
   */
  calculateRecommendations(data: OnboardingData): OnboardingRecommendations {
    const age = this.calculateAge(data.birthDate);
    const activityLevel = this.mapWorkoutsToActivityLevel(data.workoutsPerWeek);

    // Calculate BMR
    const bmr = this.calculateBMR(data.weight, data.height, age, data.gender);

    // Calculate TDEE
    const tdee = this.calculateTDEE(bmr, activityLevel);

    // Adjust for goal
    const calories = this.adjustCaloriesForGoal(tdee, data.goal);

    // Calculate macros
    const macros = this.calculateMacros(calories, data.weight, data.goal);

    // Calculate Project Timeline
    let estimatedDays: number | undefined;
    let projectedDate: string | undefined;

    if (data.targetWeight && data.goal !== 'maintenance') {
      const weightDiff = Math.abs(data.weight - data.targetWeight);
      if (weightDiff > 0) {
        // 1kg of human body mass roughly equals 7700 kcal
        const totalCaloricShiftNeeded = weightDiff * 7700;
        const dailyShift = 500; // Flat shift established in adjustCaloriesForGoal
        estimatedDays = Math.ceil(totalCaloricShiftNeeded / dailyShift);
        
        const projDate = new Date();
        projDate.setDate(projDate.getDate() + estimatedDays);
        projectedDate = projDate.toISOString().split('T')[0];
      }
    }

    return {
      calories,
      protein: macros.protein,
      carbs: macros.carbs,
      fats: macros.fats,
      estimatedDays,
      projectedDate,
    };
  }
}

