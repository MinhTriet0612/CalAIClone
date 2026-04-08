import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ScientificService } from '../scientific/scientific.service';

@Injectable()
export class CoachingService {
  constructor(
    private prisma: PrismaService,
    private scientificService: ScientificService,
  ) {}

  async getAdaptiveAnalytics(userId: string) {
    const today = new Date();
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(today.getDate() - 14);

    // 1. Get trend weights for the last 14 days
    const weightLogs = await this.prisma.weightLog.findMany({
      where: {
        userId,
        createdAt: { gte: fourteenDaysAgo },
      },
      orderBy: { createdAt: 'asc' },
    });

    if (weightLogs.length < 2) {
      return { status: 'INSUFFICIENT_DATA', message: 'Need at least 2 weights over 14 days' };
    }

    const firstWeight = weightLogs[0].trendWeight;
    const lastWeight = weightLogs[weightLogs.length - 1].trendWeight;
    const weightChange = lastWeight - firstWeight;

    // 2. Get average calorie intake for the last 14 days
    const meals = await this.prisma.meal.findMany({
      where: {
        userId,
        date: { gte: fourteenDaysAgo },
      },
    });

    const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
    const avgIntake = totalCalories / 14;

    // 3. Calculate Adaptive TDEE
    const adaptiveTDEE = this.scientificService.calculateAdaptiveTDEE(
      avgIntake,
      weightChange,
      14,
    );

    // 4. Check for plateau based on deficit erosion (TDEE - Intake <= 100)
    const isPlateau = this.scientificService.predictPlateau(adaptiveTDEE, avgIntake);

    return {
      status: 'SUCCESS',
      currentTrendWeight: lastWeight,
      weightChange14d: Number(weightChange.toFixed(2)),
      avgIntake14d: Math.round(avgIntake),
      adaptiveTDEE: Math.round(adaptiveTDEE),
      isPlateau,
      trajectory: this.scientificService.getTrajectory(lastWeight, avgIntake, adaptiveTDEE, 30),
    };
  }
}
