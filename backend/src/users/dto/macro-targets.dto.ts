import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, IsOptional, IsString } from 'class-validator';

export class MacroTargetsDto {
  @ApiProperty({
    example: 2000,
    description: 'Daily calorie target',
  })
  @IsNumber()
  @Min(1000, { message: 'Calo tối thiểu 1000 kcal' })
  calories: number;

  @ApiProperty({
    example: 150,
    description: 'Daily protein target in grams',
  })
  @IsNumber()
  @Min(50, { message: 'Protein tối thiểu 50g' })
  protein: number;

  @ApiProperty({
    example: 250,
    description: 'Daily carbohydrates target in grams',
  })
  @IsNumber()
  @Min(50, { message: 'Carbs tối thiểu 50g' })
  carbs: number;

  @ApiProperty({
    example: 65,
    description: 'Daily fats target in grams',
  })
  @IsNumber()
  @Min(20, { message: 'Fats tối thiểu 20g' })
  fats: number;

  @ApiProperty({ example: 154, required: false })
  estimatedDays?: number;

  @ApiProperty({ example: '2026-09-07', required: false })
  projectedDate?: string;
}

