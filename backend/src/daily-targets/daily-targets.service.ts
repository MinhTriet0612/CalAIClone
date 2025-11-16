import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MacroTargets } from '../shared/types';
import { UsersService } from '../users/users.service';

@Injectable()
export class DailyTargetsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  /**
   * Get targets for a specific date
   * Auto-creates daily target from user defaults if missing
   */
  async getTargetsForDate(userId: string, date: string, autoCreate: boolean = true): Promise<MacroTargets> {
    // Parse date string (YYYY-MM-DD) and create date at start of day in UTC
    const dateParts = date.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);
    const targetDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

    // Try to get daily target for this date
    let dailyTarget = await this.prisma.dailyTarget.findUnique({
      where: {
        userId_date: {
          userId,
          date: targetDate,
        },
      },
    });

    // If daily target exists, return it
    if (dailyTarget) {
      return {
        calories: dailyTarget.calories,
        protein: dailyTarget.protein,
        carbs: dailyTarget.carbs,
        fats: dailyTarget.fats,
      };
    }

    // Get user's default targets
    const userTargets = await this.usersService.getUserTargets(userId);
    const defaultTargets = userTargets || {
      calories: 2000,
      protein: 150,
      carbs: 250,
      fats: 65,
    };

    // Auto-create daily target from user defaults if enabled
    if (autoCreate) {
      dailyTarget = await this.prisma.dailyTarget.create({
        data: {
          userId,
          date: targetDate,
          calories: defaultTargets.calories,
          protein: defaultTargets.protein,
          carbs: defaultTargets.carbs,
          fats: defaultTargets.fats,
          healthScore: null, // Will be calculated from meals
        },
      });

      return {
        calories: dailyTarget.calories,
        protein: dailyTarget.protein,
        carbs: dailyTarget.carbs,
        fats: dailyTarget.fats,
      };
    }

    // Return defaults without creating (if autoCreate is false)
    return defaultTargets;
  }

  /**
   * Set or update daily targets for a specific date
   */
  async setDailyTargets(
    userId: string,
    date: string,
    targets: MacroTargets,
    healthScore?: number,
  ): Promise<void> {
    // Parse date string (YYYY-MM-DD) and create date at start of day in UTC
    const dateParts = date.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);
    const targetDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

    // Validate health score if provided
    const validatedHealthScore = healthScore !== undefined
      ? Math.max(1, Math.min(10, Math.round(healthScore)))
      : null;

    // Upsert daily target (create or update)
    await this.prisma.dailyTarget.upsert({
      where: {
        userId_date: {
          userId,
          date: targetDate,
        },
      },
      update: {
        calories: targets.calories,
        protein: targets.protein,
        carbs: targets.carbs,
        fats: targets.fats,
        healthScore: validatedHealthScore,
      },
      create: {
        userId,
        date: targetDate,
        calories: targets.calories,
        protein: targets.protein,
        carbs: targets.carbs,
        fats: targets.fats,
        healthScore: validatedHealthScore,
      },
    });
  }

  /**
   * Delete daily targets for a specific date (revert to user defaults)
   */
  async deleteDailyTargets(userId: string, date: string): Promise<void> {
    const dateParts = date.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);
    const targetDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

    await this.prisma.dailyTarget.deleteMany({
      where: {
        userId,
        date: targetDate,
      },
    });
  }

  /**
   * Get all daily targets for a user within a date range
   * Auto-creates missing daily targets from user defaults
   */
  async getDailyTargetsRange(
    userId: string,
    startDate: string,
    endDate: string,
    autoCreate: boolean = true,
  ): Promise<Array<{ date: string; targets: MacroTargets }>> {
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

    // Get user defaults for auto-creation
    const userTargets = await this.usersService.getUserTargets(userId);
    const defaultTargets = userTargets || {
      calories: 2000,
      protein: 150,
      carbs: 250,
      fats: 65,
    };

    // Get existing daily targets
    const existingTargets = await this.prisma.dailyTarget.findMany({
      where: {
        userId,
        date: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { date: 'asc' },
    });

    // Create a map of existing targets by date
    const existingMap = new Map<string, typeof existingTargets[0]>();
    existingTargets.forEach((target) => {
      const dateKey = target.date.toISOString().split('T')[0];
      existingMap.set(dateKey, target);
    });

    // Generate all dates in range
    const result: Array<{ date: string; targets: MacroTargets }> = [];
    const currentDate = new Date(start);

    while (currentDate <= end) {
      const dateKey = currentDate.toISOString().split('T')[0];
      const existing = existingMap.get(dateKey);

      if (existing) {
        // Use existing target
        result.push({
          date: dateKey,
          targets: {
            calories: existing.calories,
            protein: existing.protein,
            carbs: existing.carbs,
            fats: existing.fats,
          },
        });
      } else if (autoCreate) {
        // Auto-create missing target
        const created = await this.prisma.dailyTarget.create({
          data: {
            userId,
            date: new Date(currentDate),
            calories: defaultTargets.calories,
            protein: defaultTargets.protein,
            carbs: defaultTargets.carbs,
            fats: defaultTargets.fats,
            healthScore: null, // Will be calculated from meals
          },
        });

        result.push({
          date: dateKey,
          targets: {
            calories: created.calories,
            protein: created.protein,
            carbs: created.carbs,
            fats: created.fats,
          },
        });
      } else {
        // Return defaults without creating
        result.push({
          date: dateKey,
          targets: defaultTargets,
        });
      }

      // Move to next day
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    return result;
  }

  /**
   * Ensure daily target exists for a date (create if missing)
   */
  async ensureDailyTargetExists(userId: string, date: string): Promise<void> {
    const dateParts = date.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);
    const targetDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

    // Check if exists
    const existing = await this.prisma.dailyTarget.findUnique({
      where: {
        userId_date: {
          userId,
          date: targetDate,
        },
      },
    });

    if (existing) {
      return; // Already exists
    }

    // Get user defaults and create
    const userTargets = await this.usersService.getUserTargets(userId);
    const defaultTargets = userTargets || {
      calories: 2000,
      protein: 150,
      carbs: 250,
      fats: 65,
    };

    await this.prisma.dailyTarget.create({
      data: {
        userId,
        date: targetDate,
        calories: defaultTargets.calories,
        protein: defaultTargets.protein,
        carbs: defaultTargets.carbs,
        fats: defaultTargets.fats,
      },
    });
  }
}

