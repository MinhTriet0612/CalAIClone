export interface Meal {
    id?: string;
    userId?: string;
    date?: Date;
    name: string;
    foodItems: string[];
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    imageUrl?: string;
    createdAt?: Date;
}
export interface MealAnalysis {
    isFood: boolean;
    foodItems: string[];
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    healthScore?: number;
    confidence?: number;
}
export interface MacroTargets {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
}
export interface DailySummary {
    date: string;
    targets: MacroTargets;
    consumed: MacroTargets;
    remaining: MacroTargets;
    meals: Meal[];
}
export interface UserProfile {
    age: number;
    gender: 'male' | 'female' | 'other';
    height: number;
    weight: number;
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
    goal: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'cutting' | 'health';
    targetWeight?: number;
    targetDate?: Date;
    dietaryPreferences?: string[];
}
