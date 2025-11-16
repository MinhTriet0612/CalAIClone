import { Module } from '@nestjs/common';
import { DailyTargetsService } from './daily-targets.service';
import { DailyTargetsController } from './daily-targets.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  providers: [DailyTargetsService],
  controllers: [DailyTargetsController],
  exports: [DailyTargetsService],
})
export class DailyTargetsModule {}

