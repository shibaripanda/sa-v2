import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai/index.js';

@Injectable()
export class OpenAIService {
  constructor(@Inject('OPENAI_CLIENT') private readonly openai: OpenAI) {}

  private async openaiReqest(request: string, content: string) {
    const res = await this.openai.chat.completions.create({
      model: 'gpt-4.1',
      messages: [
        {
          role: 'system',
          content: request,
        },
        { role: 'user', content: content },
      ],
      temperature: 0,
    });
    const jsonText = res.choices?.[0]?.message?.content ?? '{}';
    return JSON.parse(jsonText) as object;
  }
}
