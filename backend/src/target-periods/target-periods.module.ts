import { Module } from '@nestjs/common';
import { TargetPeriodsService } from './target-periods.service';
import { TargetPeriodsController } from './target-periods.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  providers: [TargetPeriodsService],
  controllers: [TargetPeriodsController],
  exports: [TargetPeriodsService],
})
export class TargetPeriodsModule {}

