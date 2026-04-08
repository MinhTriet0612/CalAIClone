import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { WeightLogsService } from './weight-logs.service';
import { CreateWeightLogDto } from './dto/create-weight-log.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('weight-logs')
@UseGuards(JwtAuthGuard)
export class WeightLogsController {
  constructor(private readonly weightLogsService: WeightLogsService) {}

  @Post()
  async create(@Request() req, @Body() dto: CreateWeightLogDto) {
    return this.weightLogsService.create(req.user.id, dto);
  }

  @Get()
  async getHistory(@Request() req) {
    return this.weightLogsService.getHistory(req.user.id);
  }

  @Get('latest-trend')
  async getLatestTrend(@Request() req) {
    const trend = await this.weightLogsService.getLatestTrend(req.user.id);
    return { trendWeight: trend };
  }
}
