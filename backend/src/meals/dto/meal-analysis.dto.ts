import { ApiProperty } from '@nestjs/swagger';

export class MealAnalysisDto {
  @ApiProperty({
    description: 'Whether the image contains actual food items',
    example: true,
  })
  isFood: boolean;

  @ApiProperty({
    description: 'List of food items identified in the image',
    example: ['grilled chicken', 'rice', 'vegetables'],
    type: [String],
  })
  foodItems: string[];

  @ApiProperty({
    description: 'Estimated total calories',
    example: 650,
  })
  calories: number;

  @ApiProperty({
    description: 'Protein content in grams',
    example: 45,
  })
  protein: number;

  @ApiProperty({
    description: 'Carbohydrates content in grams',
    example: 60,
  })
  carbs: number;

  @ApiProperty({
    description: 'Fats content in grams',
    example: 20,
  })
  fats: number;

  @ApiProperty({
    description: 'Health score from 1-10 (1=poor, 10=excellent)',
    example: 7,
    minimum: 1,
    maximum: 10,
    required: false,
  })
  healthScore?: number;

  @ApiProperty({
    description: 'Confidence level of the analysis (0-1)',
    example: 0.85,
    required: false,
  })
  confidence?: number;

  @ApiProperty({
    description: 'URL of the uploaded meal image',
    example: 'https://freeimage.host/images/2024/01/15/meal-image.jpg',
    required: false,
  })
  imageUrl?: string;
}

