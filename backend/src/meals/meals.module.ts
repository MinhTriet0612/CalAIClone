import { Module } from '@nestjs/common';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import { AiModule } from '../ai/ai.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { DailyTargetsModule } from '../daily-targets/daily-targets.module';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [AiModule, PrismaModule, AuthModule, DailyTargetsModule, ImageModule],
  controllers: [MealsController],
  providers: [MealsService],
})
export class MealsModule {}

