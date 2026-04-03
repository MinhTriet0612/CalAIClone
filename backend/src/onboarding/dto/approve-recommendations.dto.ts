import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, IsOptional, IsString } from 'class-validator';

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

  @ApiProperty({ example: 'male', enum: ['male', 'female', 'other'] })
  @IsOptional()
  @IsString()
  gender?: 'male' | 'female' | 'other';

  @ApiProperty({ example: 175 })
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiProperty({ example: 70 })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({ example: '1995-01-01' })
  @IsOptional()
  @IsString()
  birthDate?: string;

  @ApiProperty({ example: 'weight_loss' })
  @IsOptional()
  @IsString()
  goal?: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'cutting' | 'health';

  @ApiProperty({ example: 3 })
  @IsOptional()
  @IsNumber()
  workoutsPerWeek?: number;
}

