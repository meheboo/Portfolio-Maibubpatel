import {
  Injectable,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { createHash } from 'crypto';
import { ChatLogRepository } from '../repositories/chat-log.repository';
import { ChatMessageDto } from '../validation/chat.dto';
import { OpenAIService } from './openai.service';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private readonly CACHE_TTL = 300; // 5 minutes

  constructor(
    private readonly chatLogRepository: ChatLogRepository,
    private readonly openaiService: OpenAIService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  /**
   * Processes an incoming chat message:
   * 1. Validates input
   * 2. Checks Redis cache (session-aware or sanitized exact query)
   * 3. Loads conversation history from PostgreSQL
   * 4. Requests a real-time response from OpenAI
   * 5. Saves user message and AI response to PostgreSQL
   * 6. Caches successful AI response in Redis
   */
  async processMessage(dto: ChatMessageDto) {
    const rawMessage = dto.message?.trim();
    if (!rawMessage) {
      throw new BadRequestException('Message cannot be empty.');
    }

    const sessionId = dto.sessionId?.trim();
    if (!sessionId) {
      throw new BadRequestException('Session ID is required.');
    }

    // Hash normalized message + session context for secure cache key
    const msgHash = createHash('sha256').update(rawMessage.toLowerCase()).digest('hex').slice(0, 24);
    const cacheKey = `chat:resp:${sessionId}:${msgHash}`;

    // 1. Try Redis cache for repeated identical queries within the active session
    try {
      const cached = await this.redis.get(cacheKey);
      if (cached) {
        this.logger.log(`Redis cache hit for session "${sessionId}" query: "${rawMessage.slice(0, 30)}..."`);
        const parsed = JSON.parse(cached);
        await this.logInteractionSafely(sessionId, rawMessage, parsed.text);
        return { ...parsed, sessionId, cached: true };
      }
    } catch (redisErr: unknown) {
      const msg = redisErr instanceof Error ? redisErr.message : String(redisErr);
      this.logger.warn(`Redis cache lookup skipped: ${msg}`);
    }

    // 2. Fetch conversation history from PostgreSQL for conversational context
    let history: Array<{ userMsg: string; botReply: string }> = [];
    try {
      const logs = await this.chatLogRepository.getSession(sessionId);
      if (logs && logs.length > 0) {
        history = logs.map((l) => ({ userMsg: l.userMsg, botReply: l.botReply }));
      }
    } catch (histErr: unknown) {
      const msg = histErr instanceof Error ? histErr.message : String(histErr);
      this.logger.warn(`Could not load session history for context: ${msg}`);
    }

    // 3. Generate response using Ollama (never trusting client-supplied botReply)
    const aiResult = await this.openaiService.generateTechnicalAnswer(rawMessage, history);
    const replyText = aiResult.text;
    const actions = aiResult.actions || [];

    const response = {
      success: true,
      sessionId,
      text: replyText,
      actions,
      provider: 'ollama',
    };

    // 4. Cache successful response in Redis (never cache failures or errors)
    try {
      await this.redis.set(cacheKey, JSON.stringify(response), 'EX', this.CACHE_TTL);
    } catch (redisErr: unknown) {
      const msg = redisErr instanceof Error ? redisErr.message : String(redisErr);
      this.logger.warn(`Redis cache set skipped: ${msg}`);
    }

    // 5. Persist interaction to PostgreSQL via Prisma
    await this.logInteractionSafely(sessionId, rawMessage, replyText);

    return response;
  }

  /**
   * Retrieves conversation history for a given session
   */
  async getSessionHistory(sessionId: string) {
    if (!sessionId) {
      return { success: false, sessionId: '', history: [], message: 'Session ID is required.' };
    }

    try {
      const logs = await this.chatLogRepository.getSession(sessionId);
      return {
        success: true,
        sessionId,
        history: logs.map((log) => ({
          id: log.id,
          userMsg: log.userMsg,
          botReply: log.botReply,
          createdAt: log.createdAt,
        })),
      };
    } catch (dbErr: unknown) {
      const msg = dbErr instanceof Error ? dbErr.message : String(dbErr);
      this.logger.warn(`Failed to fetch history for ${sessionId}: ${msg}`);
      return {
        success: false,
        sessionId,
        history: [],
        message: 'Could not retrieve conversation history.',
      };
    }
  }

  private async logInteractionSafely(sessionId: string, userMsg: string, botReply: string) {
    try {
      await this.chatLogRepository.log(sessionId, userMsg, botReply);
      this.logger.log(`Chat interaction logged for session: ${sessionId}`);
    } catch (dbErr: unknown) {
      const msg = dbErr instanceof Error ? dbErr.message : String(dbErr);
      this.logger.warn(`Chat logging skipped: ${msg}`);
    }
  }
}
