import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ScientificService } from '../scientific/scientific.service';
import { CreateWeightLogDto } from './dto/create-weight-log.dto';

@Injectable()
export class WeightLogsService {
  constructor(
    private prisma: PrismaService,
    private scientificService: ScientificService,
  ) {}

  async create(userId: string, dto: CreateWeightLogDto) {
    // 1. Get the most recent weight log to get the previous trend
    const lastLog = await this.prisma.weightLog.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    const previousTrend = lastLog ? lastLog.trendWeight : null;

    // 2. Calculate new trend weight using EMA
    const newTrend = this.scientificService.calculateEMA(dto.weight, previousTrend);

    // 3. Save the log
    const log = await this.prisma.weightLog.create({
      data: {
        userId,
        rawWeight: dto.weight,
        trendWeight: newTrend,
      },
    });

    // 4. Update the user's primary weight field (for legacy BMR calculations)
    await this.prisma.user.update({
      where: { id: userId },
      data: { weight: dto.weight },
    });

    return log;
  }

  async getHistory(userId: string) {
    return this.prisma.weightLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getLatestTrend(userId: string) {
    const lastLog = await this.prisma.weightLog.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return lastLog ? lastLog.trendWeight : null;
  }
}
