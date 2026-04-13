import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { CoachingService } from './coaching.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/coaching')
@UseGuards(JwtAuthGuard)
export class CoachingController {
  constructor(private readonly coachingService: CoachingService) {}

  @Get('analytics')
  async getAnalytics(@Request() req) {
    return this.coachingService.getAdaptiveAnalytics(req.user.id);
  }
}
