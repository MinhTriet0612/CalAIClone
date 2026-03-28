import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MealsModule } from './meals/meals.module';
import { DailyTargetsModule } from './daily-targets/daily-targets.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { ChatModule } from './chat/chat.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { MetricsMiddleware } from './monitoring/metrics.middleware';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    MealsModule,
    DailyTargetsModule,
    OnboardingModule,
    ChatModule,
    MonitoringModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MetricsMiddleware).forRoutes('*');
  }
}
