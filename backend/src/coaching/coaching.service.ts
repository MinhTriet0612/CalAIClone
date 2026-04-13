import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ScientificService } from '../scientific/scientific.service';

@Injectable()
export class CoachingService {
  constructor(
    private prisma: PrismaService,
    private scientificService: ScientificService,
  ) {}

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

  async getAdaptiveAnalytics(userId: string) {
    const profileId = await this.getProfileId(userId);
    const today = new Date();
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(today.getDate() - 14);

    // 1. Get trend weights for the last 14 days
    const weightLogs = await this.prisma.weightLog.findMany({
      where: {
        profileId,
        createdAt: { gte: fourteenDaysAgo },
      },
      orderBy: { createdAt: 'asc' },
    });

    if (weightLogs.length < 2) {
      // return { status: 'INSUFFICIENT_DATA', message: 'Need at least 2 weights over 14 days' };
      // DEMO MODE: Provide fake 14-day data so the user can see the UI!
      return {
        status: 'SUCCESS',
        currentTrendWeight: 75.5,
        weightChange14d: -1.2,
        avgIntake14d: 2100,
        adaptiveTDEE: 2760,
        isPlateau: false,
        trajectory: this.scientificService.getTrajectory(75.5, 2100, 2760, 30),
        isDemo: true, // Flag to show it's mock data
      };
    }

    const firstWeight = weightLogs[0].trendWeight;
    const lastWeight = weightLogs[weightLogs.length - 1].trendWeight;
    const weightChange = lastWeight - firstWeight;

    // 2. Get average calorie intake for the last 14 days
    const meals = await this.prisma.meal.findMany({
      where: {
        profileId,
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
