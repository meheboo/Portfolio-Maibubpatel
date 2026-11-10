import {
  Controller, Post, Get, Body, Param, HttpCode, HttpStatus,
  UsePipes, ValidationPipe,
} from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { ChatMessageDto } from '../validation/chat.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('message')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 30, ttl: 60000 } }) // 30 messages/min
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async message(@Body() dto: ChatMessageDto) {
    return this.chatService.processMessage(dto);
  }

  @Get('history/:sessionId')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 60, ttl: 60000 } })
  async getHistory(@Param('sessionId') sessionId: string) {
    return this.chatService.getSessionHistory(sessionId);
  }
}
