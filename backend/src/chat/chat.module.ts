import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { AiModule } from '../ai/ai.module';
import { AuthModule } from '../auth/auth.module';
import { DailyTargetsModule } from '../daily-targets/daily-targets.module';
import { ChatMealSummaryService } from './chat-meal-summary.service';

@Module({
  imports: [AiModule, AuthModule, DailyTargetsModule],
  controllers: [ChatController],
  providers: [ChatMealSummaryService],
})
export class ChatModule { }

