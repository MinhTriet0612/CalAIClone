import { Controller, Get, Post, Put, Delete, Body, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { DailyTargetsService } from './daily-targets.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import type { UserPayload } from '../auth/decorators/user.decorator';
import { MacroTargetsDto } from '../users/dto/macro-targets.dto';
import type { MacroTargets } from '../shared/types';

@ApiTags('daily-targets')
@ApiBearerAuth('JWT-auth')
@Controller('api/daily-targets')
@UseGuards(JwtAuthGuard)
export class DailyTargetsController {
  constructor(private readonly dailyTargetsService: DailyTargetsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get daily targets for a specific date',
    description: 'Returns daily targets for the specified date. Auto-creates a daily target record from user defaults if missing.',
  })
  @ApiQuery({
    name: 'date',
    required: true,
    description: 'Date in YYYY-MM-DD format',
    example: '2024-01-15',
  })
  @ApiQuery({
    name: 'autoCreate',
    required: false,
    description: 'Auto-create daily target if missing (default: true)',
    type: Boolean,
  })
  @ApiResponse({
    status: 200,
    description: 'Daily targets retrieved successfully (auto-created if missing)',
    type: MacroTargetsDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getDailyTargets(
    @User() user: UserPayload,
    @Query('date') date: string,
    @Query('autoCreate') autoCreate?: string,
  ): Promise<MacroTargets> {
    const shouldAutoCreate = autoCreate !== 'false'; // Default to true
    return this.dailyTargetsService.getTargetsForDate(user.id, date, shouldAutoCreate);
  }

  @Put()
  @ApiOperation({
    summary: 'Set or update daily targets for a specific date',
    description: 'Set custom targets for a specific day. This overrides the user\'s default targets for that day only.',
  })
  @ApiQuery({
    name: 'date',
    required: true,
    description: 'Date in YYYY-MM-DD format',
    example: '2024-01-15',
  })
  @ApiResponse({
    status: 200,
    description: 'Daily targets updated successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Daily targets updated successfully' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid targets data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async setDailyTargets(
    @User() user: UserPayload,
    @Query('date') date: string,
    @Body() body: MacroTargetsDto & { healthScore?: number },
  ) {
    const { healthScore, ...targets } = body;
    await this.dailyTargetsService.setDailyTargets(user.id, date, targets, healthScore);
    return { message: 'Daily targets updated successfully' };
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete daily targets for a specific date',
    description: 'Remove custom daily targets for a date. The system will fall back to user\'s default targets.',
  })
  @ApiQuery({
    name: 'date',
    required: true,
    description: 'Date in YYYY-MM-DD format',
    example: '2024-01-15',
  })
  @ApiResponse({
    status: 200,
    description: 'Daily targets deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Daily targets deleted successfully' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteDailyTargets(
    @User() user: UserPayload,
    @Query('date') date: string,
  ) {
    await this.dailyTargetsService.deleteDailyTargets(user.id, date);
    return { message: 'Daily targets deleted successfully' };
  }

  @Get('range')
  @ApiOperation({
    summary: 'Get daily targets for a date range',
    description: 'Returns all custom daily targets within the specified date range.',
  })
  @ApiQuery({
    name: 'startDate',
    required: true,
    description: 'Start date in YYYY-MM-DD format',
    example: '2024-01-01',
  })
  @ApiQuery({
    name: 'endDate',
    required: true,
    description: 'End date in YYYY-MM-DD format',
    example: '2024-01-31',
  })
  @ApiResponse({
    status: 200,
    description: 'Daily targets retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          date: { type: 'string', example: '2024-01-15' },
          targets: { $ref: '#/components/schemas/MacroTargetsDto' },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getDailyTargetsRange(
    @User() user: UserPayload,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.dailyTargetsService.getDailyTargetsRange(user.id, startDate, endDate);
  }
}

