import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class MacroTargetsDto {
  @ApiProperty({ example: 2000 })
  calories: number;

  @ApiProperty({ example: 150 })
  protein: number;

  @ApiProperty({ example: 250 })
  carbs: number;

  @ApiProperty({ example: 65 })
  fats: number;
}

class MealDto {
  @ApiProperty({ example: 'meal123' })
  id?: string;

  @ApiProperty({ example: 'user123' })
  userId?: string;

  @ApiProperty({ example: '2024-01-15T12:00:00Z' })
  date?: Date;

  @ApiProperty({ example: 'Grilled Chicken with Rice' })
  name: string;

  @ApiProperty({ example: ['grilled chicken', 'rice'] })
  foodItems: string[];

  @ApiProperty({ example: 650 })
  calories: number;

  @ApiProperty({ example: 45 })
  protein: number;

  @ApiProperty({ example: 60 })
  carbs: number;

  @ApiProperty({ example: 20 })
  fats: number;

  @ApiPropertyOptional({
    description: 'Health score from 1-10',
    example: 7,
    minimum: 1,
    maximum: 10,
  })
  healthScore?: number;
}

export class DailySummaryDto {
  @ApiProperty({ example: '2024-01-15' })
  date: string;

  @ApiProperty({ type: MacroTargetsDto })
  targets: MacroTargetsDto;

  @ApiProperty({ type: MacroTargetsDto })
  consumed: MacroTargetsDto;

  @ApiProperty({ type: MacroTargetsDto })
  remaining: MacroTargetsDto;

  @ApiProperty({ type: [MealDto] })
  meals: MealDto[];

  @ApiPropertyOptional({
    description: 'Daily health score from 1-10 (average of meal health scores)',
    example: 7.5,
    minimum: 1,
    maximum: 10,
  })
  healthScore?: number;
}

