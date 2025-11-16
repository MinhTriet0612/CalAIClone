import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, Min, Max, IsDateString } from 'class-validator';

export class CalculateRecommendationsDto {
  @ApiProperty({
    example: 'male',
    enum: ['male', 'female', 'other'],
    description: 'User gender',
  })
  @IsEnum(['male', 'female', 'other'])
  gender: 'male' | 'female' | 'other';

  @ApiProperty({
    example: 175,
    description: 'Height in centimeters',
    minimum: 100,
    maximum: 250,
  })
  @IsNumber()
  @Min(100)
  @Max(250)
  height: number;

  @ApiProperty({
    example: 70,
    description: 'Weight in kilograms',
    minimum: 30,
    maximum: 300,
  })
  @IsNumber()
  @Min(30)
  @Max(300)
  weight: number;

  @ApiProperty({
    example: '1990-01-15',
    description: 'Birth date in YYYY-MM-DD format',
  })
  @IsDateString()
  birthDate: string;

  @ApiProperty({
    example: 3,
    description: 'Number of workouts per week',
    minimum: 0,
    maximum: 14,
  })
  @IsNumber()
  @Min(0)
  @Max(14)
  workoutsPerWeek: number;

  @ApiProperty({
    example: 'weight_loss',
    enum: ['weight_loss', 'muscle_gain', 'maintenance', 'cutting', 'health'],
    description: 'User fitness goal',
  })
  @IsEnum(['weight_loss', 'muscle_gain', 'maintenance', 'cutting', 'health'])
  goal: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'cutting' | 'health';
}

