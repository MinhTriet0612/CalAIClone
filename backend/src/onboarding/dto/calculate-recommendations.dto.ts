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
  @Min(100, { message: 'Chiều cao tối thiểu 100 cm' })
  @Max(250, { message: 'Chiều cao tối đa 250 cm' })
  height: number;

  @ApiProperty({
    example: 70,
    description: 'Weight in kilograms',
    minimum: 30,
    maximum: 300,
  })
  @IsNumber()
  @Min(30, { message: 'Cân nặng tối thiểu 30 kg' })
  @Max(300, { message: 'Cân nặng tối đa 300 kg' })
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
    enum: ['weight_loss', 'muscle_gain', 'maintenance'],
    description: 'User fitness goal',
  })
  @IsEnum(['weight_loss', 'muscle_gain', 'maintenance'])
  goal: 'weight_loss' | 'muscle_gain' | 'maintenance';

  @ApiProperty({
    example: 65,
    description: 'Target weight in kilograms',
    minimum: 30,
    maximum: 300,
    required: false,
  })
  @IsNumber()
  @Min(30)
  @Max(300)
  targetWeight?: number;
}

