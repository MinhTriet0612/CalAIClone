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

  async create(userId: string, dto: CreateWeightLogDto) {
    const profileId = await this.getProfileId(userId);

    // 1. Get the most recent weight log to get the previous trend
    const lastLog = await this.prisma.weightLog.findFirst({
      where: { profileId },
      orderBy: { createdAt: 'desc' },
    });

    const previousTrend = lastLog ? lastLog.trendWeight : null;

    // 2. Calculate new trend weight using EMA
    const newTrend = this.scientificService.calculateEMA(dto.weight, previousTrend);

    // 3. Save the log
    const log = await this.prisma.weightLog.create({
      data: {
        profileId,
        rawWeight: dto.weight,
        trendWeight: newTrend,
      },
    });

    // 4. Update the profile's primary weight field (for calculations)
    await this.prisma.profile.update({
      where: { id: profileId },
      data: { weight: dto.weight },
    });

    return log;
  }

  async getHistory(userId: string) {
    const profileId = await this.getProfileId(userId);
    return this.prisma.weightLog.findMany({
      where: { profileId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getLatestTrend(userId: string) {
    const profileId = await this.getProfileId(userId);
    const lastLog = await this.prisma.weightLog.findFirst({
      where: { profileId },
      orderBy: { createdAt: 'desc' },
    });
    return lastLog ? lastLog.trendWeight : null;
  }
}
