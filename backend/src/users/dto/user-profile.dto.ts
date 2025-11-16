import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty({ example: 30 })
  age: number;

  @ApiProperty({ example: 'male', enum: ['male', 'female', 'other'] })
  gender: 'male' | 'female' | 'other';

  @ApiProperty({ example: 175, description: 'Height in centimeters' })
  height: number;

  @ApiProperty({ example: 70, description: 'Weight in kilograms' })
  weight: number;

  @ApiProperty({
    example: 'moderate',
    enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'],
  })
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

  @ApiProperty({
    example: 'weight_loss',
    enum: ['weight_loss', 'muscle_gain', 'maintenance', 'cutting', 'health'],
  })
  goal: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'cutting' | 'health';

  @ApiPropertyOptional({ example: 65 })
  targetWeight?: number;

  @ApiPropertyOptional({ example: '2024-06-01' })
  targetDate?: Date;

  @ApiPropertyOptional({ example: ['vegetarian'], type: [String] })
  dietaryPreferences?: string[];
}

