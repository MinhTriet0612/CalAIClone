import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MacroTargets } from '../shared/types';

@Injectable()
export class TargetPeriodsService {
  constructor(private prisma: PrismaService) {}

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

  async getTargetsForDate(userId: string, date: string): Promise<MacroTargets> {
    const profileId = await this.getProfileId(userId);
    const dayStart = new Date(date + 'T00:00:00.000Z');
    const dayEnd = new Date(date + 'T23:59:59.999Z');

    const targetPeriod = await this.prisma.targetPeriod.findFirst({
      where: {
        profileId,
        startDate: { lte: dayEnd },
        OR: [
          { endDate: { gte: dayStart } },
          { endDate: null },
        ],
      },
      orderBy: { startDate: 'desc' },
    });

    if (targetPeriod) {
      return {
        calories: targetPeriod.calories,
        protein: targetPeriod.protein,
        carbs: targetPeriod.carbs,
        fats: targetPeriod.fats,
      };
    }

    // Extreme fallback if a user has no periods at all (e.g., error during migration)
    return {
      calories: 2000,
      protein: 150,
      carbs: 250,
      fats: 65,
    };
  }

  /**
   * Get target values for a date range
   */
  async getTargetPeriodsRange(
    userId: string,
    startDate: string,
    endDate: string,
  ): Promise<Array<{ date: string; targets: MacroTargets }>> {
    const start = new Date(startDate + 'T00:00:00.000Z');
    const end = new Date(endDate + 'T23:59:59.999Z');

    const result: Array<{ date: string; targets: MacroTargets }> = [];
    const currentDate = new Date(start);

    // Iteratively resolve the target for each day.
    // In a mass-scale app this is O(N) queries, but N is max 31 so it's perfectly fine.
    while (currentDate <= end) {
      const dateKey = currentDate.toISOString().split('T')[0];
      const targets = await this.getTargetsForDate(userId, dateKey);

      result.push({ date: dateKey, targets });

      // Move to next day safely in UTC
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    return result;
  }
}
