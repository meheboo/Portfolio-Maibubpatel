import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';

export const CONTACT_QUEUE = 'contact-email-queue';

@Injectable()
export class QueueService {
    private readonly logger = new Logger(QueueService.name);

    constructor(
        @InjectQueue(CONTACT_QUEUE) private readonly contactQueue: Queue,
    ) { }

    async enqueueContactEmail(inquiryId: string, data: object) {
        const job = await this.contactQueue.add(
            'send-contact-email',
            { inquiryId, ...data },
            {
                attempts: 3,           // retry 3 times on failure
                backoff: {
                    type: 'exponential',
                    delay: 2000,         // 2s, 4s, 8s
                },
                removeOnComplete: true,
                removeOnFail: false,   // keep failed jobs for debugging
            },
        );
        this.logger.log(`Job ${job.id} queued for inquiry ${inquiryId}`);
        return job;
    }
}
