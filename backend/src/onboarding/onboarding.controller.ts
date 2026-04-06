import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { OnboardingService } from './onboarding.service';
import { CalculateRecommendationsDto } from './dto/calculate-recommendations.dto';
import { ApproveRecommendationsDto } from './dto/approve-recommendations.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import type { UserPayload } from '../auth/decorators/user.decorator';
import { UsersService } from '../users/users.service';
import { MacroTargetsDto } from '../users/dto/macro-targets.dto';
import { TargetPeriodsService } from '../target-periods/target-periods.service';

@ApiTags('onboarding')
@ApiBearerAuth('JWT-auth')
@Controller('api/onboarding')
@UseGuards(JwtAuthGuard)
export class OnboardingController {
  constructor(
    private readonly onboardingService: OnboardingService,
    private readonly usersService: UsersService,
    private readonly targetPeriodsService: TargetPeriodsService,
  ) {}

  @Post('calculate')
  @ApiOperation({
    summary: 'Calculate daily recommendations based on user data',
    description: 'Calculates personalized calorie and macro targets without storing data. Returns recommendations for user approval.',
  })
  @ApiResponse({
    status: 200,
    description: 'Recommendations calculated successfully',
    type: MacroTargetsDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async calculateRecommendations(
    @Body() data: CalculateRecommendationsDto,
  ): Promise<MacroTargetsDto> {
    const recommendations = this.onboardingService.calculateRecommendations({
      gender: data.gender,
      height: data.height,
      weight: data.weight,
      birthDate: data.birthDate,
      workoutsPerWeek: data.workoutsPerWeek,
      goal: data.goal,
      targetWeight: data.targetWeight,
    });

    return {
      calories: recommendations.calories,
      protein: recommendations.protein,
      carbs: recommendations.carbs,
      fats: recommendations.fats,
      estimatedDays: recommendations.estimatedDays,
      projectedDate: recommendations.projectedDate,
    } as MacroTargetsDto;
  }

  @Post('approve')
  @ApiOperation({
    summary: 'Approve and save daily recommendations',
    description: 'Saves the approved calorie and macro targets to user profile. This completes the onboarding process.',
  })
  @ApiResponse({
    status: 200,
    description: 'Recommendations approved and saved successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Recommendations saved successfully' },
        targets: { $ref: '#/components/schemas/MacroTargetsDto' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid targets data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async approveRecommendations(
    @User() user: UserPayload,
    @Body() targets: ApproveRecommendationsDto,
  ) {
    console.log('[Onboarding] Received targets:', targets);
    const normalizedTargets = {
      calories: targets.calories,
      protein: targets.protein,
      carbs: targets.carbs,
      fats: targets.fats,
    };

    // 1. Update user targets
    await this.usersService.updateUserTargets(user.id, normalizedTargets, targets.goal);

    // 2. Update user profile metrics (UC-5 Persistence Fix)
    if (targets.gender || targets.height || targets.weight || targets.birthDate) {
      // Map workouts per week to activity level if provided
      let activityLevel: string | undefined = undefined;
      if (targets.workoutsPerWeek !== undefined) {
        activityLevel = targets.workoutsPerWeek <= 2 ? 'sedentary' : 
                        targets.workoutsPerWeek <= 5 ? 'moderate' : 'very_active';
      }

      // Calculate age if birthDate provided
      let age: number | undefined = undefined;
      let birthDateObj: Date | undefined = undefined;
      if (targets.birthDate) {
        birthDateObj = new Date(targets.birthDate);
        const today = new Date();
        age = today.getFullYear() - birthDateObj.getFullYear();
        const m = today.getMonth() - birthDateObj.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
          age--;
        }
      }

      console.log('[Onboarding] Profile Update Payload:', {
        gender: targets.gender,
        height: targets.height,
        weight: targets.weight,
        age: age,
        birthDate: birthDateObj,
        workoutsPerWeek: targets.workoutsPerWeek,
        activityLevel: activityLevel,
        goal: targets.goal,
      });

      await this.usersService.updateUserProfile(user.id, {
        gender: targets.gender,
        height: targets.height,
        weight: targets.weight,
        targetWeight: targets.targetWeight,
        age: age,
        birthDate: birthDateObj,
        workoutsPerWeek: targets.workoutsPerWeek,
        activityLevel: activityLevel as any,
        goal: targets.goal,
      });

      console.log('[Onboarding] Profile updated successfully');
    }


    return {
      message: 'Recommendations and profile saved successfully',
      targets: normalizedTargets,
    };
  }
}

