import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import type { UserPayload } from '../auth/decorators/user.decorator';
import { UserProfileDto } from './dto/user-profile.dto';
import { MacroTargetsDto } from './dto/macro-targets.dto';

@ApiTags('users')
@ApiBearerAuth('JWT-auth')
@Controller('api/users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('me')
  @ApiOperation({
    summary: 'Get current user information',
    description: 'Returns the authenticated user\'s profile and settings',
  })
  @ApiResponse({
    status: 200,
    description: 'User information retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'user123' },
        email: { type: 'string', example: 'user@example.com' },
        profile: { $ref: '#/components/schemas/UserProfileDto' },
        targets: { $ref: '#/components/schemas/MacroTargetsDto' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCurrentUser(@User() user: UserPayload) {
    const userData = await this.usersService.getUserById(user.id);
    return userData;
  }

  @Put('profile')
  @ApiOperation({
    summary: 'Update user profile',
    description: 'Update the authenticated user\'s profile information (age, height, weight, goals, etc.)',
  })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Profile updated successfully' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid profile data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateProfile(
    @User() user: UserPayload,
    @Body() profile: UserProfileDto,
  ) {
    await this.usersService.updateUserProfile(user.id, profile);
    return { message: 'Profile updated successfully' };
  }

  @Put('targets')
  @ApiOperation({
    summary: 'Update calorie and macro targets',
    description: 'Update the authenticated user\'s daily calorie and macronutrient targets',
  })
  @ApiResponse({
    status: 200,
    description: 'Targets updated successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Targets updated successfully' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid targets data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateTargets(
    @User() user: UserPayload,
    @Body() targets: MacroTargetsDto,
  ) {
    await this.usersService.updateUserTargets(user.id, targets);
    return { message: 'Targets updated successfully' };
  }
}

