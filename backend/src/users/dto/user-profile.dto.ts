import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, Min, Max, IsEnum, IsOptional } from 'class-validator';

export class UserProfileDto {
  @ApiProperty({ example: 30 })
  @IsOptional()
  age: number;

  @ApiProperty({ example: 'male', enum: ['male', 'female', 'other'] })
  @IsOptional()
  gender: 'male' | 'female' | 'other';

  @ApiProperty({ example: 175, description: 'Height in centimeters' })
  @IsOptional()
  @IsNumber()
  @Min(100, { message: 'Chiều cao tối thiểu 100 cm' })
  @Max(250, { message: 'Chiều cao tối đa 250 cm' })
  height: number;

  @ApiProperty({ example: 70, description: 'Weight in kilograms' })
  @IsOptional()
  @IsNumber()
  @Min(30, { message: 'Cân nặng tối thiểu 30 kg' })
  @Max(300, { message: 'Cân nặng tối đa 300 kg' })
  weight: number;

  @ApiProperty({
    example: 'moderate',
    enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'],
  })
  @IsOptional()
  @IsEnum(['sedentary', 'light', 'moderate', 'active', 'very_active'])
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

  @ApiProperty({
    example: 'weight_loss',
    enum: ['weight_loss', 'muscle_gain', 'maintenance'],
  })
  goal: 'weight_loss' | 'muscle_gain' | 'maintenance';

  @ApiPropertyOptional({ example: 65 })
  targetWeight?: number;
}
