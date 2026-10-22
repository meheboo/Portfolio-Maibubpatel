import {
  Controller, Post, Body, Req, HttpCode, HttpStatus,
  UsePipes, ValidationPipe,
} from '@nestjs/common';
import type { Request } from 'express';
import { ContactService } from '../services/contact.service';
import { CreateContactDto } from '../validation/contact.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('api/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 req/min per IP
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async submit(@Body() dto: CreateContactDto, @Req() req: Request) {
    const ip = req.ip || req.headers['x-forwarded-for'] as string || 'unknown';
    return this.contactService.submitInquiry(dto, ip);
  }
}
