import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async log(sessionId: string, userMsg: string, botReply: string) {
    return this.prisma.chatLog.create({
      data: { sessionId, userMsg, botReply },
    });
  }

  async getSession(sessionId: string) {
    return this.prisma.chatLog.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
    });
  }
}
