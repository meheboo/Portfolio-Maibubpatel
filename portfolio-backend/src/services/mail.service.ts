import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('mail.host'),
      port: this.config.get('mail.port'),
      secure: false,
      auth: {
        user: this.config.get('mail.user'),
        pass: this.config.get('mail.pass'),
      },
    });
  }

  async sendContactNotification(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    const ownerEmail = this.config.get<string>('mail.ownerEmail');
    const from = this.config.get<string>('mail.from');

    // Email to owner (you)
    await this.transporter.sendMail({
      from,
      to: ownerEmail,
      subject: `[Portfolio] New inquiry: ${data.subject} from ${data.name}`,
      html: `
        <h2>New Portfolio Inquiry</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    });

    // Auto-reply to sender
    await this.transporter.sendMail({
      from,
      to: data.email,
      subject: `Thank you for reaching out, ${data.name}!`,
      html: `
        <h2>Hi ${data.name},</h2>
        <p>Thank you for your message! I've received your inquiry 
        regarding <strong>${data.subject}</strong> and will get 
        back to you within 24–48 hours.</p>
        <p>Best regards,<br/>Maibub Patel<br/>Full Stack Developer</p>
      `,
    });

    this.logger.log(`Email sent for inquiry from ${data.email}`);
  }
}
