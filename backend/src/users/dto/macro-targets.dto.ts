import { ApiProperty } from '@nestjs/swagger';

export class MacroTargetsDto {
  @ApiProperty({
    example: 2000,
    description: 'Daily calorie target',
  })
  calories: number;

  @ApiProperty({
    example: 150,
    description: 'Daily protein target in grams',
  })
  protein: number;

  @ApiProperty({
    example: 250,
    description: 'Daily carbohydrates target in grams',
  })
  carbs: number;

  @ApiProperty({
    example: 65,
    description: 'Daily fats target in grams',
  })
  fats: number;
}

