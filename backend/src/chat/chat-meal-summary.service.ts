import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TargetPeriodsService } from '../target-periods/target-periods.service';
import { DailySummary, MacroTargets, Meal } from '../shared/types';

@Injectable()
export class ChatMealSummaryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly targetPeriodsService: TargetPeriodsService,
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

  private async findMealsByDate(userId: string, date: string): Promise<Meal[]> {
    const profileId = await this.getProfileId(userId);
    const [year, month, day] = date.split('-').map((part) => parseInt(part, 10));
    const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

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

  async getDailySummary(userId: string, date?: string): Promise<DailySummary> {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const meals = await this.findMealsByDate(userId, targetDate);

    const targets = await this.targetPeriodsService.getTargetsForDate(userId, targetDate);

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
}


