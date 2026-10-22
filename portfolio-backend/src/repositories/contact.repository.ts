import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from '../validation/contact.dto';

@Injectable()
export class ContactRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Compute shard key from email hash (0–7 = 8 logical shards)
   * In production: route to different DB connections based on shardKey
   */
  private getShardKey(email: string): number {
    let hash = 0;
    for (const char of email) {
      hash = (hash * 31 + char.charCodeAt(0)) % 8;
    }
    return hash;
  }

  async create(dto: CreateContactDto) {
    return this.prisma.contactInquiry.create({
      data: {
        name: dto.name,
        email: dto.email,
        subject: dto.subject,
        message: dto.message,
        status: 'pending',
        shardKey: this.getShardKey(dto.email),
      },
    });
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.contactInquiry.update({
      where: { id },
      data: { status },
    });
  }

  async findById(id: string) {
    return this.prisma.contactInquiry.findUnique({ where: { id } });
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    return this.prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });
  }
}
