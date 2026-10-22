import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GlobalRateLimitMiddleware implements NestMiddleware {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip || 'unknown';
    const key = `global:ratelimit:${ip}`;
    const count = await this.redis.incr(key);
    if (count === 1) await this.redis.expire(key, 60);

    if (count > 100) { // 100 global requests/min/IP
      throw new HttpException('Too Many Requests', HttpStatus.TOO_MANY_REQUESTS);
    }
    next();
  }
}
