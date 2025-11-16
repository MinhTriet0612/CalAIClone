import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { MealsService } from './meals.service';
import { AiService } from '../ai/ai.service';
import { ImageService } from '../image/image.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { MealAnalysisDto } from './dto/meal-analysis.dto';
import { DailySummaryDto } from './dto/daily-summary.dto';
import type { MealAnalysis } from '../shared/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import type { UserPayload } from '../auth/decorators/user.decorator';

@ApiTags('meals')
@ApiBearerAuth('JWT-auth')
@Controller('api/meals')
@UseGuards(JwtAuthGuard)
export class MealsController {
  constructor(
    private readonly mealsService: MealsService,
    private readonly aiService: AiService,
    private readonly imageService: ImageService,
  ) { }

  @Get('daily-summary')
  @ApiOperation({
    summary: 'Get daily calorie summary',
    description: 'Returns today\'s targets, consumed calories, remaining macros, and all meals logged for the day',
  })
  @ApiQuery({
    name: 'date',
    required: false,
    description: 'Date in YYYY-MM-DD format (defaults to today)',
    example: '2024-01-15',
  })
  @ApiResponse({
    status: 200,
    description: 'Daily summary retrieved successfully',
    type: DailySummaryDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
  async getDailySummary(
    @User() user: UserPayload,
    @Query('date') date?: string,
  ) {
    return this.mealsService.getDailySummary(user.id, date);
  }

  @Post('analyze')
  @ApiOperation({
    summary: 'Analyze meal image with AI',
    description: 'Upload a meal image and get AI-powered nutritional analysis including calories and macronutrients. Image is automatically uploaded to freeimage.host and URL is included in response.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Meal image file (jpg, png, webp)',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Meal analyzed successfully',
    type: MealAnalysisDto,
  })
  @ApiResponse({ status: 400, description: 'No image file provided' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
  @UseInterceptors(FileInterceptor('image'))
  async analyzeMeal(@UploadedFile() file: Express.Multer.File | undefined) {
    if (!file || !file.buffer) {
      throw new Error('No image file provided');
    }

    // Analyze meal image
    const analysis: MealAnalysis = await this.aiService.analyzeMealImage(
      file.buffer,
      file.mimetype,
    );

    // Upload image to freeimage.host if food is detected
    if (analysis.isFood) {
      try {
        const imageUrl = await this.imageService.uploadImage(
          file.buffer,
          file.originalname || 'meal-image.jpg',
        );
        analysis.imageUrl = imageUrl;
      } catch (error) {
        console.error('Failed to upload image, continuing without image URL:', error);
        // Continue without image URL if upload fails
      }
    }

    return analysis;
  }

  @Get('today')
  @ApiOperation({
    summary: 'Get meals logged today',
    description: 'Returns all meals logged for today',
  })
  @ApiResponse({
    status: 200,
    description: 'Today\'s meals retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        date: { type: 'string', example: '2024-01-15' },
        meals: {
          type: 'array',
          items: { $ref: '#/components/schemas/MealDto' },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
  async getTodayMeals(@User() user: UserPayload) {
    const meals = await this.mealsService.getTodayMeals(user.id);
    const today = new Date().toISOString().split('T')[0];
    return {
      date: today,
      meals,
    };
  }

  @Post('log')
  @ApiOperation({
    summary: 'Log a meal',
    description: 'Add a meal to the daily log and return updated daily summary with recalculated remaining calories',
  })
  @ApiResponse({
    status: 200,
    description: 'Meal logged successfully',
    type: DailySummaryDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid meal data' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
  async logMeal(
    @User() user: UserPayload,
    @Body() createMealDto: CreateMealDto,
  ) {
    await this.mealsService.create(createMealDto, user.id);
    // Return updated daily summary with recalculated remaining calories
    return this.mealsService.getDailySummary(user.id);
  }

  @Get('recalculate')
  @ApiOperation({
    summary: 'Recalculate daily summary',
    description: 'Force recalculation of consumed and remaining calories for a specific date (defaults to today)',
  })
  @ApiQuery({
    name: 'date',
    required: false,
    description: 'Date in YYYY-MM-DD format (defaults to today)',
    example: '2024-01-15',
  })
  @ApiResponse({
    status: 200,
    description: 'Daily summary recalculated successfully',
    type: DailySummaryDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
  async recalculateDailySummary(
    @User() user: UserPayload,
    @Query('date') date?: string,
  ) {
    return this.mealsService.recalculateDailySummary(user.id, date);
  }

  @Get('history')
  @ApiOperation({
    summary: 'Get meal history for a date range',
    description: 'Returns daily summaries (targets, consumed, remaining) for all dates within the specified range',
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
    description: 'History retrieved successfully',
    schema: {
      type: 'array',
      items: { $ref: '#/components/schemas/DailySummaryDto' },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
  async getHistory(
    @User() user: UserPayload,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.mealsService.getHistory(user.id, startDate, endDate);
  }
}
