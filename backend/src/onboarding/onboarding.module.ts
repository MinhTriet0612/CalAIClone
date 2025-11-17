import { Module } from '@nestjs/common';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';
import { UsersModule } from '../users/users.module';
import { DailyTargetsModule } from '../daily-targets/daily-targets.module';

@Module({
  imports: [UsersModule, DailyTargetsModule],
  controllers: [OnboardingController],
  providers: [OnboardingService],
  exports: [OnboardingService],
})
export class OnboardingModule {}

