import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MeatChatDto } from './dto/meat-chat.dto';
import { AiService } from '../ai/ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import type { UserPayload } from '../auth/decorators/user.decorator';
import { ChatMealSummaryService } from './chat-meal-summary.service';

@ApiTags('chat')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('api/chat')
export class ChatController {
  constructor(
    private readonly aiService: AiService,
    private readonly chatMealSummaryService: ChatMealSummaryService,
  ) { }

  @Post('meat')
  @ApiOperation({
    summary: 'Ask the meat-focused chatbot',
    description: 'Get coaching tips about meat choices, cooking methods, or the best protein for your macro goals.',
  })
  @ApiResponse({
    status: 200,
    description: 'Chat response generated successfully',
    schema: {
      type: 'object',
      properties: {
        reply: { type: 'string', description: 'AI response text' },
      },
    },
  })
  async askMeatCoach(@User() user: UserPayload, @Body() dto: MeatChatDto) {
    let summary;
    try {
      summary = await this.chatMealSummaryService.getDailySummary(user.id);
    } catch (error) {
      console.warn('Unable to load user summary for chat context:', error);
    }

    const reply = await this.aiService.generateMeatCoachAdvice(dto.prompt, dto.history, summary);
    return { reply };
  }
}

