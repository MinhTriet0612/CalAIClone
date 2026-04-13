import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Meal, DailySummary, MacroTargets } from '../shared/types';
import { CreateMealDto } from './dto/create-meal.dto';
import { TargetPeriodsService } from '../target-periods/target-periods.service';

@Injectable()
export class MealsService {
  constructor(
    private prisma: PrismaService,
    private targetPeriodsService: TargetPeriodsService,
  ) { }

  private async getProfileId(userId: string): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
    if (!user || !user.profile) {
      throw new Error(`Profile not found for user ${userId}`);
    }
    return user.profile.id;
  }

  /**
   * Calculate health score based on meal nutritional values
   * Simple algorithm: considers balance of macros and calorie density
   */
  private calculateHealthScore(meal: CreateMealDto): number {
    // If health score is provided, use it
    if (meal.healthScore !== undefined) {
      return Math.max(1, Math.min(10, Math.round(meal.healthScore)));
    }

    // Calculate based on nutritional balance
    let score = 5; // Base score

    // Protein ratio (higher protein = healthier, up to 30% of calories)
    const proteinCalories = meal.protein * 4;
    const proteinRatio = proteinCalories / meal.calories;
    if (proteinRatio > 0.25) score += 1.5;
    else if (proteinRatio > 0.15) score += 0.5;

    // Fat ratio (moderate fat is good, 20-35% of calories)
    const fatCalories = meal.fats * 9;
    const fatRatio = fatCalories / meal.calories;
    if (fatRatio >= 0.20 && fatRatio <= 0.35) score += 1;
    else if (fatRatio > 0.50) score -= 1; // Too much fat

    // Calorie density (lower is generally better, but depends on portion)
    // For now, we'll use a simple heuristic
    if (meal.calories < 300) score += 0.5; // Light meal
    else if (meal.calories > 1000) score -= 0.5; // Very heavy meal

    // Ensure score is between 1-10
    return Math.max(1, Math.min(10, Math.round(score)));
  }

  async create(createMealDto: CreateMealDto, userId: string): Promise<Meal> {
    const profileId = await this.getProfileId(userId);
    // Calculate health score if not provided
    const healthScore = this.calculateHealthScore(createMealDto);

    // Create meal with current date/time
    const meal = await this.prisma.meal.create({
      data: {
        profileId,
        name: createMealDto.name,
        foodItems: createMealDto.foodItems,
        calories: createMealDto.calories,
        protein: createMealDto.protein,
        carbs: createMealDto.carbs,
        fats: createMealDto.fats,
        imageUrl: createMealDto.imageUrl,
        healthScore: healthScore,
        date: createMealDto.date ? new Date(createMealDto.date) : new Date(), 
      },
    });

    return {
      id: meal.id,
      userId,
      date: meal.date,
      name: meal.name,
      foodItems: meal.foodItems,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fats: meal.fats,
      imageUrl: meal.imageUrl || undefined,
      healthScore: meal?.healthScore || undefined,
      createdAt: meal.createdAt,
    };
  }

  async findAll(userId: string): Promise<Meal[]> {
    const profileId = await this.getProfileId(userId);
    const meals = await this.prisma.meal.findMany({
      where: { profileId },
      orderBy: { createdAt: 'desc' },
    });

    return meals.map((meal) => ({
      id: meal.id,
      userId,
      date: meal.date,
      name: meal.name,
      foodItems: meal.foodItems,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fats: meal.fats,
      imageUrl: meal.imageUrl || undefined,
      healthScore: meal.healthScore || undefined,
      createdAt: meal.createdAt,
    }));
  }

  async findByDate(userId: string, date: string): Promise<Meal[]> {
    const profileId = await this.getProfileId(userId);
    // Parse date string (YYYY-MM-DD) and create date range in UTC
    const dateParts = date.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; 
    const day = parseInt(dateParts[2], 10);

    const startOfDay = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(year, month, day, 23, 59, 59, 999));

    const meals = await this.prisma.meal.findMany({
      where: {
        profileId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: { date: 'desc' },
    });

    return meals.map((meal) => ({
      id: meal.id,
      userId,
      date: meal.date,
      name: meal.name,
      foodItems: meal.foodItems,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fats: meal.fats,
      imageUrl: meal.imageUrl || undefined,
      healthScore: meal.healthScore || undefined,
      createdAt: meal.createdAt,
    }));
  }

  async getTodayMeals(userId: string): Promise<Meal[]> {
    const today = new Date().toISOString().split('T')[0];
    return this.findByDate(userId, today);
  }

  async getDailySummary(userId: string, date?: string): Promise<DailySummary> {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const meals = await this.findByDate(userId, targetDate);

    // Get targets for this specific date
    const targets = await this.targetPeriodsService.getTargetsForDate(userId, targetDate);

    // Calculate consumed totals
    const consumed: MacroTargets = meals.reduce(
      (acc, meal) => ({
        calories: acc.calories + Number(meal.calories),
        protein: acc.protein + Number(meal.protein),
        carbs: acc.carbs + Number(meal.carbs),
        fats: acc.fats + Number(meal.fats),
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 },
    );

    const remaining: MacroTargets = {
      calories: Math.max(0, targets.calories - consumed.calories),
      protein: Math.max(0, targets.protein - consumed.protein),
      carbs: Math.max(0, targets.carbs - consumed.carbs),
      fats: Math.max(0, targets.fats - consumed.fats),
    };

    return {
      date: targetDate,
      targets,
      consumed,
      remaining,
      meals,
    };
  }

  async recalculateDailySummary(userId: string, date?: string): Promise<DailySummary> {
    return this.getDailySummary(userId, date);
  }

  async getHistory(userId: string, startDate: string, endDate: string): Promise<DailySummary[]> {
    const profileId = await this.getProfileId(userId);
    const startParts = startDate.split('-');
    const endParts = endDate.split('-');
    const start = new Date(Date.UTC(parseInt(startParts[0], 10), parseInt(startParts[1], 10) - 1, parseInt(startParts[2], 10), 0, 0, 0, 0));
    const end = new Date(Date.UTC(parseInt(endParts[0], 10), parseInt(endParts[1], 10) - 1, parseInt(endParts[2], 10), 23, 59, 59, 999));

    // Get user's creation date
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { createdAt: true },
    });

    const userCreatedDate = user?.createdAt || new Date();
    const creationStart = new Date(Date.UTC(userCreatedDate.getUTCFullYear(), userCreatedDate.getUTCMonth(), userCreatedDate.getUTCDate(), 0, 0, 0, 0));
    const finalStart = start > creationStart ? start : creationStart;

    const meals = await this.prisma.meal.findMany({
      where: {
        profileId,
        date: {
          gte: finalStart,
          lte: end,
        },
      },
      orderBy: { date: 'desc' },
    });

    // Group meals by date
    const mealsByDate = new Map<string, Meal[]>();
    meals.forEach((meal) => {
      const dateKey = meal.date.toISOString().split('T')[0];
      if (!mealsByDate.has(dateKey)) {
        mealsByDate.set(dateKey, []);
      }
      mealsByDate.get(dateKey)!.push({
        id: meal.id,
        userId,
        date: meal.date,
        name: meal.name,
        foodItems: meal.foodItems,
        calories: meal.calories,
        protein: meal.protein,
        carbs: meal.carbs,
        fats: meal.fats,
        imageUrl: meal.imageUrl || undefined,
        healthScore: meal.healthScore || undefined,
        createdAt: meal.createdAt,
      });
    });

    // Get all unique dates from meals
    const activityDates = Array.from(mealsByDate.keys());

    // Generate summaries
    const summaries: DailySummary[] = [];
    
    for (const dateKey of activityDates) {
      const dayMeals = mealsByDate.get(dateKey) || [];
      const targets = await this.targetPeriodsService.getTargetsForDate(userId, dateKey);

      const consumed: MacroTargets = dayMeals.reduce(
        (acc, meal) => ({
          calories: acc.calories + Number(meal.calories),
          protein: acc.protein + Number(meal.protein),
          carbs: acc.carbs + Number(meal.carbs),
          fats: acc.fats + Number(meal.fats),
        }),
        { calories: 0, protein: 0, carbs: 0, fats: 0 },
      );

      const remaining: MacroTargets = {
        calories: Math.max(0, targets.calories - consumed.calories),
        protein: Math.max(0, targets.protein - consumed.protein),
        carbs: Math.max(0, targets.carbs - consumed.carbs),
        fats: Math.max(0, targets.fats - consumed.fats),
      };

      summaries.push({
        date: dateKey,
        targets,
        consumed,
        remaining,
        meals: dayMeals,
      });
    }

    return summaries.sort((a, b) => b.date.localeCompare(a.date));
  }
}
