import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import type { Job } from 'bull';
import { CONTACT_QUEUE } from '../services/queue.service';
import { MailService } from '../services/mail.service';
import { ContactRepository } from '../repositories/contact.repository';

@Processor(CONTACT_QUEUE)
export class ContactEmailProcessor {
  private readonly logger = new Logger(ContactEmailProcessor.name);

  constructor(
    private readonly mailService: MailService,
    private readonly contactRepository: ContactRepository,
  ) {}

  @Process('send-contact-email')
  async handleSendEmail(job: Job) {
    const { inquiryId, name, email, subject, message } = job.data;
    const attempt = job.attemptsMade + 1;
    this.logger.log(`Processing email job ${job.id} for inquiry ${inquiryId} (Attempt ${attempt}/${job.opts.attempts || 3})`);

    try {
      await this.mailService.sendContactNotification({
        name,
        email,
        subject,
        message,
      });
      await this.contactRepository.updateStatus(inquiryId, 'sent');
      this.logger.log(`Email delivered successfully for inquiry ${inquiryId}`);
    } catch (error: any) {
      if (attempt >= (job.opts.attempts || 3)) {
        await this.contactRepository.updateStatus(inquiryId, 'failed');
        this.logger.error(`Email permanently failed after ${attempt} attempts for inquiry ${inquiryId}: ${error.message}`);
      } else {
        this.logger.warn(`Email attempt ${attempt} failed for inquiry ${inquiryId}: ${error.message}. Scheduling retry...`);
      }
      throw error; // Let Bull retry with backoff
    }
  }
}
