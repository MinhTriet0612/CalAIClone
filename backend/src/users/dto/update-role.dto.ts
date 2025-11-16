import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIn } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({
    description: 'User ID to update',
    example: 'user123',
  })
  @IsString()
  uid: string;

  @ApiProperty({
    description: 'New role for the user',
    example: 'admin',
    enum: ['user', 'admin'],
  })
  @IsIn(['user', 'admin'])
  role: 'user' | 'admin';
}

