import { registerAs } from '@nestjs/config';

export default registerAs('ai', () => ({
  ollamaBaseUrl:
    process.env.OLLAMA_BASE_URL || 'http://localhost:11434',

  ollamaModel:
    process.env.OLLAMA_MODEL || 'qwen2.5-coder:1.5b',
}));
