import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { BullModule } from '@nestjs/bull';
import { RedisModule } from '@nestjs-modules/ioredis';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import redisConfig from './config/redis.config';
import mailConfig from './config/mail.config';

import { PrismaModule } from './prisma/prisma.module';
import { ContactController } from './controllers/contact.controller';
import { ChatController } from './controllers/chat.controller';
import { ContactService } from './services/contact.service';
import { ChatService } from './services/chat.service';
import { MailService } from './services/mail.service';
import { QueueService, CONTACT_QUEUE } from './services/queue.service';
import { ContactRepository } from './repositories/contact.repository';
import { ChatLogRepository } from './repositories/chat-log.repository';
import { ContactEmailProcessor } from './processors/contact-email.processor';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, redisConfig, mailConfig],
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
      },
    }),
    BullModule.registerQueue({ name: CONTACT_QUEUE }),
    RedisModule.forRoot({
      type: 'single',
      url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || '6379'}`,
    }),
    PrismaModule,
  ],
  controllers: [ContactController, ChatController],
  providers: [
    ContactService,
    ChatService,
    MailService,
    QueueService,
    ContactRepository,
    ChatLogRepository,
    ContactEmailProcessor,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
