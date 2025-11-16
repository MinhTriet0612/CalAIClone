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

@ApiTags('onboarding')
@ApiBearerAuth('JWT-auth')
@Controller('api/onboarding')
@UseGuards(JwtAuthGuard)
export class OnboardingController {
  constructor(
    private readonly onboardingService: OnboardingService,
    private readonly usersService: UsersService,
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
    });

    return {
      calories: recommendations.calories,
      protein: recommendations.protein,
      carbs: recommendations.carbs,
      fats: recommendations.fats,
    };
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
    await this.usersService.updateUserTargets(user.id, {
      calories: targets.calories,
      protein: targets.protein,
      carbs: targets.carbs,
      fats: targets.fats,
    });

    return {
      message: 'Recommendations saved successfully',
      targets: {
        calories: targets.calories,
        protein: targets.protein,
        carbs: targets.carbs,
        fats: targets.fats,
      },
    };
  }
}

