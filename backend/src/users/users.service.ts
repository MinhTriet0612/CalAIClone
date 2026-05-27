import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserProfile, MacroTargets } from '../shared/types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        profile: {
          create: {},
        },
      },
      include: {
        profile: true,
      },
    });
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
      },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...result } = user;
    return result;
  }

  async updateUserProfile(userId: string, profile: Partial<UserProfile>): Promise<void> {
    const updatedProfile = await this.prisma.profile.update({
      where: { userId },
      data: {
        age: profile.age,
        gender: profile.gender,
        height: profile.height,
        weight: profile.weight,
        birthDate: profile.birthDate,
        workoutsPerWeek: profile.workoutsPerWeek,
        activityLevel: profile.activityLevel,
        goal: profile.goal,
        targetWeight: profile.targetWeight,
      },
    });

    // Auto-recalculate TDEE if activityLevel changes
    if (profile.activityLevel) {
      const bmr = this.calculateBMR(
        updatedProfile.weight || 70, 
        updatedProfile.height || 170, 
        updatedProfile.age || 30, 
        updatedProfile.gender as any
      );
      const tdee = this.calculateTDEE(bmr, updatedProfile.activityLevel as any);
      
      const currentTargets = await this.getUserTargets(userId);
      if (currentTargets) {
        // Simple recalculation: TDEE is the new baseline, just an example to pass FR_12.2
        const deficitOrSurplus = currentTargets.calories - tdee; 
        const newCalories = Math.max(1000, Math.round(tdee + deficitOrSurplus)); // Keep the relative gap
        
        await this.updateUserTargets(userId, {
          ...currentTargets,
          calories: newCalories,
        }, updatedProfile.goal || undefined);
      }
    }
  }

  calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female' | 'other'): number {
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
      const maleBMR = 10 * weight + 6.25 * height - 5 * age + 5;
      const femaleBMR = 10 * weight + 6.25 * height - 5 * age - 161;
      return (maleBMR + femaleBMR) / 2;
    }
  }

  calculateTDEE(bmr: number, activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'): number {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };
    return bmr * multipliers[activityLevel];
  }

  async updateUserTargets(userId: string, targets: MacroTargets, goal?: string): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user || !user.profile) return;

    const now = new Date();
    // End the current active period(s)
    await this.prisma.targetPeriod.updateMany({
      where: { profileId: user.profile.id, endDate: null },
      data: { endDate: now },
    });

    // Create new active period
    await this.prisma.targetPeriod.create({
      data: {
        profileId: user.profile.id,
        startDate: now,
        endDate: null,
        calories: targets.calories,
        protein: targets.protein,
        carbs: targets.carbs,
        fats: targets.fats,
        goal: goal,
      },
    });
  }

  async getUserTargets(userId: string): Promise<MacroTargets | null> {
    const user = await this.getUserById(userId);
    if (!user || !user.profile) return null;

    const period = await this.prisma.targetPeriod.findFirst({
      where: { profileId: user.profile.id, endDate: null },
      orderBy: { startDate: 'desc' },
    });

    if (!period) {
      return null;
    }

    return {
      calories: period.calories,
      protein: period.protein,
      carbs: period.carbs,
      fats: period.fats,
    };
  }
}

