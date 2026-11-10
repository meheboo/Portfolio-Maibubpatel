
import {
  Injectable,
  Logger,
  ServiceUnavailableException,
  RequestTimeoutException,
  HttpException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

export interface GeneratedAIResponse {
  text: string;
  actions?: Array<{
    type: string;
    prompt?: string;
    label: string;
    target?: string;
    url?: string;
  }>;
}

@Injectable()
export class OpenAIService {
  private readonly logger = new Logger(OpenAIService.name);

  private readonly baseUrl: string;
  private readonly model: string;
  private readonly timeoutMs = 180000;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl =
      this.configService.get<string>('ai.ollamaBaseUrl') ||
      process.env.OLLAMA_BASE_URL ||
      'http://localhost:11434';

    this.model =
      this.configService.get<string>('ai.ollamaModel') ||
      process.env.OLLAMA_MODEL ||
      'qwen2.5-coder:1.5b';

    this.logger.log(
      `Ollama initialized: model=${this.model}, url=${this.baseUrl}`,
    );
  }

  isConfigured(): boolean {
    return Boolean(this.baseUrl && this.model);
  }

  async generateTechnicalAnswer(
    userMessage: string,
    history?: Array<{ userMsg: string; botReply: string }>,
  ): Promise<GeneratedAIResponse> {
    if (!this.isConfigured()) {
      throw new ServiceUnavailableException(
        'Ollama configuration is missing.',
      );
    }

    const systemPrompt = `
You are an intelligent Technical Interview Assistant
and Full-Stack Engineering mentor for Maibub Patel's developer portfolio.

Your responsibilities:

1. Explain programming concepts in simple English.
2. Help with JavaScript, React.js, Node.js, NestJS and TypeScript.
3. Explain PostgreSQL, MongoDB, Redis and Prisma.
4. Help with System Design and Data Structures.
5. Provide practical programming examples.
6. Prepare users for technical interviews.
7. Use clean Markdown formatting.
8. Give accurate, friendly and useful answers.
9. For greetings, respond naturally and briefly.
10. Avoid unrelated topics.

When providing code:
- Use correct syntax.
- Explain important lines.
- Include practical examples.
`;

    const formattedHistory: Array<{
      role: 'user' | 'assistant';
      content: string;
    }> = [];

    if (history?.length) {
      for (const item of history.slice(-10)) {
        if (item.userMsg?.trim()) {
          formattedHistory.push({
            role: 'user',
            content: item.userMsg.trim(),
          });
        }

        if (item.botReply?.trim()) {
          formattedHistory.push({
            role: 'assistant',
            content: item.botReply.trim(),
          });
        }
      }
    }

    const controller = new AbortController();

    const timeoutId = setTimeout(
      () => controller.abort(),
      this.timeoutMs,
    );

    try {
      const response = await fetch(
        `${this.baseUrl}/api/chat`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            model: this.model,

            messages: [
              {
                role: 'system',
                content: systemPrompt,
              },

              ...formattedHistory,

              {
                role: 'user',
                content: userMessage.trim(),
              },
            ],

            stream: false,

            options: {
              temperature: 0.6,
            },
          }),

          signal: controller.signal,
        },
      );

      if (!response.ok) {
        const errorMessage = await response.text();

        this.logger.error(
          `Ollama API failed: Status ${response.status} - ${errorMessage}`,
        );

        throw new ServiceUnavailableException(
          'Ollama AI service returned an error.',
        );
      }

      const data = await response.json();

      const replyContent = data?.message?.content;

      if (
        !replyContent ||
        typeof replyContent !== 'string'
      ) {
        throw new ServiceUnavailableException(
          'Ollama returned an empty response.',
        );
      }

      this.logger.log(
        `Ollama response generated successfully using ${this.model}`,
      );

      return {
        text: replyContent.trim(),
        actions: this.getSuggestedFollowUps(userMessage),
      };

    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        this.logger.error(
          `Ollama request timed out after ${this.timeoutMs}ms`,
        );

        throw new RequestTimeoutException(
          'Ollama request timed out. Please try again.',
        );
      }

      if (error instanceof HttpException) {
        throw error;
      }

      const errorMessage =
        error instanceof Error ? error.message : String(error);

      this.logger.error(
        `Ollama communication failure: ${errorMessage}`,
      );

      throw new ServiceUnavailableException(
        'Unable to communicate with Ollama. Check whether Ollama is running.',
      );

    } finally {
      clearTimeout(timeoutId);
    }
  }

  private getSuggestedFollowUps(
    userMessage: string,
  ): Array<{
    type: string;
    prompt: string;
    label: string;
  }> {
    const lower = userMessage.toLowerCase();

    if (lower.includes('react') || lower.includes('hook')) {
      return [
        {
          type: 'prompt',
          prompt: 'Explain useMemo and useCallback with examples.',
          label: 'React Hooks',
        },
        {
          type: 'prompt',
          prompt: 'Explain React component lifecycle.',
          label: 'React Lifecycle',
        },
      ];
    }

    if (lower.includes('node') || lower.includes('event loop')) {
      return [
        {
          type: 'prompt',
          prompt: 'Explain Node.js event loop phases.',
          label: 'Node.js Event Loop',
        },
        {
          type: 'prompt',
          prompt: 'Explain Node.js streams and buffers.',
          label: 'Streams & Buffers',
        },
      ];
    }

    if (lower.includes('nest')) {
      return [
        {
          type: 'prompt',
          prompt: 'Explain Dependency Injection in NestJS.',
          label: 'NestJS DI',
        },
        {
          type: 'prompt',
          prompt: 'Explain NestJS middleware and guards.',
          label: 'Middleware & Guards',
        },
      ];
    }

    return [
      {
        type: 'prompt',
        prompt: 'Explain SOLID principles with TypeScript examples.',
        label: 'SOLID Principles',
      },
      {
        type: 'prompt',
        prompt: 'Explain REST API design best practices.',
        label: 'REST API Design',
      },
    ];
  }
}
