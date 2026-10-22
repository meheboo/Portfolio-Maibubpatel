import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { ChatLogRepository } from '../repositories/chat-log.repository';
import { ChatMessageDto } from '../validation/chat.dto';

@Injectable()
export class ChatService {
  private readonly CACHE_TTL = 300; // 5 minutes

  constructor(
    private readonly chatLogRepository: ChatLogRepository,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async processMessage(dto: ChatMessageDto) {
    // Check Redis cache for repeated questions
    const cacheKey = `chat:response:${Buffer.from(dto.message).toString('base64').slice(0, 32)}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      return { ...JSON.parse(cached), cached: true };
    }

    // Your NLP logic lives here (or call a real AI API)
    // For now, delegate to the same rules as the frontend service
    // In production: call OpenAI / Gemini API here
    const response = {
      text: `You asked: "${dto.message}". Backend AI processing here.`,
      actions: [],
    };

    // Cache the response
    await this.redis.set(cacheKey, JSON.stringify(response), 'EX', this.CACHE_TTL);

    // Log conversation
    await this.chatLogRepository.log(dto.sessionId, dto.message, response.text);

    return response;
  }
}
