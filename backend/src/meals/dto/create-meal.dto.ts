import { IsString, IsNumber, IsArray, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMealDto {
  @ApiProperty({
    description: 'Name of the meal',
    example: 'Grilled Chicken with Rice',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'List of food items in the meal',
    example: ['grilled chicken', 'rice', 'vegetables'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  foodItems: string[];

  @ApiProperty({
    description: 'Total calories in the meal',
    example: 650,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  calories: number;

  @ApiProperty({
    description: 'Protein content in grams',
    example: 45,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  protein: number;

  @ApiProperty({
    description: 'Carbohydrates content in grams',
    example: 60,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  carbs: number;

  @ApiProperty({
    description: 'Fats content in grams',
    example: 20,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  fats: number;

  @ApiPropertyOptional({
    description: 'URL of the meal image (optional)',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'Health score from 1-10 (optional, can be calculated automatically)',
    example: 7,
    minimum: 1,
    maximum: 10,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  healthScore?: number;
  @ApiPropertyOptional({
    description: 'Date of the meal (YYYY-MM-DD), defaults to today',
    example: '2024-01-15',
  })
  @IsOptional()
  @IsString()
  date?: string;
}

