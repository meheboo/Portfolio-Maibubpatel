import {
  Controller, Post, Body, HttpCode, HttpStatus,
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
}
