import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { ContactRepository } from '../repositories/contact.repository';
import { QueueService } from './queue.service';
import { CreateContactDto } from '../validation/contact.dto';

@Injectable()
export class ContactService {
    private readonly logger = new Logger(ContactService.name);

    constructor(
        private readonly contactRepository: ContactRepository,
        private readonly queueService: QueueService,
        @InjectRedis() private readonly redis: Redis,
    ) { }

    async submitInquiry(dto: CreateContactDto, ip: string) {
        // Redis-based IP spam protection (max 3 submissions per hour per IP)
        const rateLimitKey = `contact:ratelimit:${ip}`;
        const count = await this.redis.incr(rateLimitKey);
        if (count === 1) {
            await this.redis.expire(rateLimitKey, 3600); // 1 hour window
        }
        if (count > 3) {
            throw new BadRequestException(
                'Too many submissions. Please try again later.',
            );
        }

        // Save to DB
        const inquiry = await this.contactRepository.create(dto);

        // Queue async email delivery via BullMQ
        await this.queueService.enqueueContactEmail(inquiry.id, {
            name: dto.name,
            email: dto.email,
            subject: dto.subject,
            message: dto.message,
        });

        // Update status to queued
        await this.contactRepository.updateStatus(inquiry.id, 'queued');

        this.logger.log(`Inquiry ${inquiry.id} created and queued`);

        return {
            success: true,
            message:
                'Your message has been received! I will get back to you within 24-48 hours.',
            id: inquiry.id,
        };
    }
}
