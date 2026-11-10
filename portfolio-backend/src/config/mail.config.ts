
import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => {
  const port = Number.parseInt(process.env.SMTP_PORT || '465', 10);

  return {
    host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
    port,
    secure: port === 465,
    requireTLS: port === 587,

    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.MAIL_FROM,
    ownerEmail: process.env.OWNER_EMAIL,
  };
});
