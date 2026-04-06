import { Module } from '@nestjs/common';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';
import { UsersModule } from '../users/users.module';
import { TargetPeriodsModule } from '../target-periods/target-periods.module';

@Module({
  imports: [UsersModule, TargetPeriodsModule],
  controllers: [OnboardingController],
  providers: [OnboardingService],
  exports: [OnboardingService],
})
export class OnboardingModule {}

