import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class ApproveRecommendationsDto {
  @ApiProperty({
    example: 2000,
    description: 'Daily calorie target',
    minimum: 1000,
  })
  @IsNumber()
  @Min(1000)
  calories: number;

  @ApiProperty({
    example: 150,
    description: 'Daily protein target in grams',
    minimum: 50,
  })
  @IsNumber()
  @Min(50)
  protein: number;

  @ApiProperty({
    example: 250,
    description: 'Daily carbs target in grams',
    minimum: 50,
  })
  @IsNumber()
  @Min(50)
  carbs: number;

  @ApiProperty({
    example: 65,
    description: 'Daily fats target in grams',
    minimum: 20,
  })
  @IsNumber()
  @Min(20)
  fats: number;
}

