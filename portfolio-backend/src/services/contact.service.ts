import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
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
        // Redis-based IP spam protection (graceful fallback if Redis is unavailable)
        try {
            const rateLimitKey = `contact:ratelimit:${ip}`;
            const count = await this.redis.incr(rateLimitKey);
            if (count === 1) {
                await this.redis.expire(rateLimitKey, 900); // 15-minute sliding window
            }
            // Allow up to 10 submissions per 15 minutes per IP for legitimate contact form inquiries
            if (count > 10) {
                throw new HttpException(
                    'Too many submissions. Please try again later.',
                    HttpStatus.TOO_MANY_REQUESTS,
                );
            }
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            }
            this.logger.warn(`Redis rate-limit check bypassed: ${err?.message || err}`);
        }

        // Save to DB (Primary persistence)
        const inquiry = await this.contactRepository.create(dto);

        // Queue async email delivery via BullMQ (graceful fallback if queue is offline)
        try {
            await this.queueService.enqueueContactEmail(inquiry.id, {
                name: dto.name,
                email: dto.email,
                subject: dto.subject,
                message: dto.message,
            });
            await this.contactRepository.updateStatus(inquiry.id, 'queued');
            this.logger.log(`Inquiry ${inquiry.id} created and queued`);
        } catch (queueErr) {
            this.logger.warn(`Queue unavailable, inquiry saved with pending status: ${queueErr?.message || queueErr}`);
        }

        return {
            success: true,
            message:
                'Your message has been received! I will get back to you within 24-48 hours.',
            id: inquiry.id,
        };
    }
}
