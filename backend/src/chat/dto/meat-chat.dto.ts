import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';

class ChatMessageDto {
  @ApiProperty({ enum: ['user', 'assistant'] })
  @IsIn(['user', 'assistant'])
  role: 'user' | 'assistant';

  @ApiProperty({ description: 'Plain text message content' })
  @IsString()
  content: string;
}

export class MeatChatDto {
  @ApiProperty({ description: 'User question about meat or protein selection' })
  @IsString()
  prompt: string;

  @ApiProperty({
    required: false,
    type: [ChatMessageDto],
    description: 'Optional condensed conversation history to keep context',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  history?: ChatMessageDto[];
}

