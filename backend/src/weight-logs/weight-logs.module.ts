import { Module } from '@nestjs/common';
import { WeightLogsService } from './weight-logs.service';
import { WeightLogsController } from './weight-logs.controller';

import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ScientificModule } from '../scientific/scientific.module';

@Module({
  imports: [AuthModule, PrismaModule, ScientificModule],
  providers: [WeightLogsService],
  controllers: [WeightLogsController],
  exports: [WeightLogsService],
})
export class WeightLogsModule {}
