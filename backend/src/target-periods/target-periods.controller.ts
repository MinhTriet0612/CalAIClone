import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { TargetPeriodsService } from './target-periods.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import type { UserPayload } from '../auth/decorators/user.decorator';
import { MacroTargetsDto } from '../users/dto/macro-targets.dto';
import type { MacroTargets } from '../shared/types';

@ApiTags('target-periods')
@ApiBearerAuth('JWT-auth')
@Controller('api/target-periods')
@UseGuards(JwtAuthGuard)
export class TargetPeriodsController {
  constructor(private readonly targetPeriodsService: TargetPeriodsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get historical targets for a specific date',
    description: 'Returns the macro targets that were active for the user on the specified date.',
  })
  @ApiQuery({
    name: 'date',
    required: true,
    description: 'Date in YYYY-MM-DD format',
    example: '2024-01-15',
  })
  @ApiResponse({
    status: 200,
    description: 'Targets retrieved successfully',
    type: MacroTargetsDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getTargetPeriods(
    @User() user: UserPayload,
    @Query('date') date: string,
  ): Promise<MacroTargets> {
    return this.targetPeriodsService.getTargetsForDate(user.id, date);
  }

  @Get('range')
  @ApiOperation({
    summary: 'Get targets for a date range',
    description: 'Returns all goals within the specified date range.',
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
    description: 'Targets retrieved successfully',
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
  async getTargetPeriodsRange(
    @User() user: UserPayload,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.targetPeriodsService.getTargetPeriodsRange(user.id, startDate, endDate);
  }
}
