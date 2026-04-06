// Shared types between frontend and backend

export interface Meal {
  id?: string;
  userId?: string;
  date?: Date;
  name: string;
  foodItems: string[];
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fats: number; // grams
  imageUrl?: string;
  healthScore?: number; // Health score from 1-10
  createdAt?: Date;
}

export interface MealAnalysis {
  isFood: boolean;
  foodItems: string[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  healthScore?: number; // Health score from 1-10
  confidence?: number;
  imageUrl?: string; // URL of uploaded image
}

export interface MacroTargets {
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fats: number; // grams
}

export interface DailySummary {
  date: string; // YYYY-MM-DD
  targets: MacroTargets;
  consumed: MacroTargets;
  remaining: MacroTargets;
  meals: Meal[];
  healthScore?: number; // Daily health score from 1-10 (average of meals or set manually)
}

export interface UserProfile {
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // cm
  weight: number; // kg
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'weight_loss' | 'muscle_gain' | 'maintenance';
  targetWeight?: number;
  targetDate?: Date;
  dietaryPreferences?: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

