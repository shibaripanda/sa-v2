import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

export const OpenAIProvider: Provider<OpenAI> = {
  provide: 'OPENAI_CLIENT',
  inject: [ConfigService],
  useFactory: (config: ConfigService): OpenAI => {
    const apiKey = config.get<string>('OPEN_AI_TOKEN');

    if (!apiKey) {
      throw new Error('OPEN_AI_TOKEN not set');
    }

    const Client = OpenAI as unknown as {
      new (opts: { apiKey: string }): OpenAI;
    };

    return new Client({ apiKey });
  },
};
