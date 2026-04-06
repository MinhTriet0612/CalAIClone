import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { AiModule } from '../ai/ai.module';
import { AuthModule } from '../auth/auth.module';
import { TargetPeriodsModule } from '../target-periods/target-periods.module';
import { ChatMealSummaryService } from './chat-meal-summary.service';

@Module({
  imports: [AiModule, AuthModule, TargetPeriodsModule],
  controllers: [ChatController],
  providers: [ChatMealSummaryService],
})
export class ChatModule { }

