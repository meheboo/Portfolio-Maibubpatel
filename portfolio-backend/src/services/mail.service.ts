import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private config: ConfigService) {
    const host =
      this.config.get<string>('mail.host') ||
      'smtp-relay.brevo.com';

    const port = Number(
      this.config.get<string | number>('mail.port') || 465,
    );

    const user = this.config.get<string>('mail.user');
    const pass = this.config.get<string>('mail.pass');

    if (![465, 587].includes(port)) {
      throw new Error(`Unsupported SMTP port: ${port}`);
    }

    if (!user || !pass) {
      throw new Error('SMTP credentials are missing.');
    }

    const secure = port === 465;

    this.logger.log(
      `Initializing MailService: host=${host}, port=${port}, secure=${secure}`,
    );

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      requireTLS: port === 587,

      auth: {
        user,
        pass,
      },

      tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production',
        servername: host,
      },

      connectionTimeout: 15000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });
  }
  async onModuleInit() {
    await this.verifyConnection();
  }

  /**
   * Diagnostic method to verify SMTP connectivity and TLS handshake on startup
   */
  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      this.logger.log('SMTP connection established and verified successfully.');
      return true;
    } catch (error: any) {
      this.logger.error(
        `SMTP Connection verification failed: [${error.code || 'UNKNOWN'}] ${error.message}`,
      );
      if (error.code === 'ESOCKET' || error.message?.includes('certificate')) {
        this.logger.error(
          'TLS Certificate Note: If running on Windows with local Antivirus/Firewall Mail Shield active (e.g., Avast, AVG, Kaspersky, Bitdefender) or corporate proxy, the scanner may intercept port 587 with a local self-signed certificate. Ensure Node trusts system certificates or add NODE_EXTRA_CA_CERTS if needed.',
        );
      }
      return false;
    }
  }

  /**
   * Safely escapes untrusted user input before rendering in HTML emails (prevents HTML/XSS injection)
   */
  private escapeHtml(str: string): string {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  async sendContactNotification(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    const ownerEmail = this.config.get<string>('mail.ownerEmail');
    const from = this.config.get<string>('mail.from');

    if (!from || !ownerEmail) {
      throw new Error('Mail configuration missing: MAIL_FROM or OWNER_EMAIL not set');
    }

    const safeName = this.escapeHtml(data.name);
    const safeEmail = this.escapeHtml(data.email);
    const safeSubject = this.escapeHtml(data.subject);
    const safeMessage = this.escapeHtml(data.message).replace(/\n/g, '<br/>');

    // 1. Email to owner
    await this.transporter.sendMail({
      from,
      to: ownerEmail,
      subject: `[Portfolio Inquiry] ${safeSubject} from ${safeName}`,
      html: `
        <h2>New Portfolio Inquiry</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f8fafc; border-left: 4px solid #6366f1; padding: 12px 16px; border-radius: 4px; font-family: sans-serif;">
          ${safeMessage}
        </div>
      `,
    });

    // 2. Auto-reply to sender
    await this.transporter.sendMail({
      from,
      to: data.email,
      subject: `Thank you for reaching out, ${safeName}!`,
      html: `
        <h2>Hi ${safeName},</h2>
        <p>Thank you for getting in touch! I have received your message regarding 
        <strong>${safeSubject}</strong> and will get back to you within 24–48 hours.</p>
        <br/>
        <p>Best regards,<br/><strong>Maibub Patel</strong><br/>Full Stack &amp; Backend Engineer</p>
      `,
    });

    this.logger.log(`Email notification and auto-reply sent successfully for inquiry from ${data.email}`);
  }
}
