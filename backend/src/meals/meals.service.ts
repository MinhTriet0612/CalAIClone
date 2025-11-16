import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Meal, DailySummary, MacroTargets } from '../shared/types';
import { CreateMealDto } from './dto/create-meal.dto';
import { DailyTargetsService } from '../daily-targets/daily-targets.service';

@Injectable()
export class MealsService {
  constructor(
    private prisma: PrismaService,
    private dailyTargetsService: DailyTargetsService,
  ) { }

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
    // Calculate health score if not provided
    const healthScore = this.calculateHealthScore(createMealDto);

    // Create meal with current date/time
    const meal = await this.prisma.meal.create({
      data: {
        userId,
        name: createMealDto.name,
        foodItems: createMealDto.foodItems,
        calories: createMealDto.calories,
        protein: createMealDto.protein,
        carbs: createMealDto.carbs,
        fats: createMealDto.fats,
        imageUrl: createMealDto.imageUrl,
        healthScore: healthScore,
        date: new Date(), // Set to current date/time
      },
    });

    return {
      id: meal.id,
      userId: meal.userId,
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
    const meals = await this.prisma.meal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return meals.map((meal) => ({
      id: meal.id,
      userId: meal.userId,
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
    // Parse date string (YYYY-MM-DD) and create date range in UTC
    const dateParts = date.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed
    const day = parseInt(dateParts[2], 10);

    // Create start and end of day in UTC to avoid timezone issues
    const startOfDay = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(year, month, day, 23, 59, 59, 999));

    const meals = await this.prisma.meal.findMany({
      where: {
        userId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: { date: 'desc' },
    });

    return meals.map((meal) => ({
      id: meal.id,
      userId: meal.userId,
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

    // Get targets for this specific date (auto-creates if missing)
    // This ensures a daily target record exists in the database
    const targets = await this.dailyTargetsService.getTargetsForDate(userId, targetDate, true);

    // Calculate consumed totals (sum all meals for the day)
    const consumed: MacroTargets = meals.reduce(
      (acc, meal) => ({
        calories: acc.calories + Number(meal.calories),
        protein: acc.protein + Number(meal.protein),
        carbs: acc.carbs + Number(meal.carbs),
        fats: acc.fats + Number(meal.fats),
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 },
    );

    // Calculate remaining (targets - consumed, minimum 0)
    // Uses the specific day's target for calculation
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
    // Force recalculation by fetching fresh data
    return this.getDailySummary(userId, date);
  }

  /**
   * Get history of daily summaries for a date range
   * Only returns dates that have actual data (meals or custom daily targets)
   */
  async getHistory(userId: string, startDate: string, endDate: string): Promise<DailySummary[]> {
    const startParts = startDate.split('-');
    const endParts = endDate.split('-');
    const start = new Date(
      Date.UTC(
        parseInt(startParts[0], 10),
        parseInt(startParts[1], 10) - 1,
        parseInt(startParts[2], 10),
        0,
        0,
        0,
        0,
      ),
    );
    const end = new Date(
      Date.UTC(
        parseInt(endParts[0], 10),
        parseInt(endParts[1], 10) - 1,
        parseInt(endParts[2], 10),
        23,
        59,
        59,
        999,
      ),
    );

    // Get all meals in date range
    const meals = await this.prisma.meal.findMany({
      where: {
        userId,
        date: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { date: 'desc' },
    });

    // Get all daily targets in date range (custom targets, not auto-created defaults)
    const dailyTargets = await this.prisma.dailyTarget.findMany({
      where: {
        userId,
        date: {
          gte: start,
          lte: end,
        },
      },
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
        userId: meal.userId,
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

    // Get dates that have custom daily targets (user set custom targets)
    const datesWithCustomTargets = new Set<string>();
    dailyTargets.forEach((target) => {
      const dateKey = target.date.toISOString().split('T')[0];
      datesWithCustomTargets.add(dateKey);
    });

    // Get dates that have meals
    const datesWithMeals = new Set<string>(mealsByDate.keys());

    // Combine: dates with meals OR custom targets
    const datesWithData = new Set<string>([
      ...datesWithMeals,
      ...datesWithCustomTargets,
    ]);

    // Only generate summaries for dates that have actual data
    const summaries: DailySummary[] = [];

    for (const dateKey of datesWithData) {
      const dayMeals = mealsByDate.get(dateKey) || [];

      // Get targets for this date (don't auto-create, just get what exists)
      const targets = await this.dailyTargetsService.getTargetsForDate(userId, dateKey, false);

      // Calculate consumed
      const consumed: MacroTargets = dayMeals.reduce(
        (acc, meal) => ({
          calories: acc.calories + Number(meal.calories),
          protein: acc.protein + Number(meal.protein),
          carbs: acc.carbs + Number(meal.carbs),
          fats: acc.fats + Number(meal.fats),
        }),
        { calories: 0, protein: 0, carbs: 0, fats: 0 },
      );

      // Calculate remaining
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

    // Sort by date descending (most recent first)
    return summaries.sort((a, b) => b.date.localeCompare(a.date));
  }
}
