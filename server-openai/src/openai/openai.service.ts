import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai/index.js';

@Injectable()
export class OpenAIService {
  constructor(
    @Inject('OPENAI_CLIENT') private readonly openai: OpenAI,
    private config: ConfigService,
  ) {}

  async analyz(photos: string[], fields: string[]) {
    const buffs: Buffer[] = [];
    for (const photo of photos) {
      const buf = await this.downloadTelegramFile(photo);
      buffs.push(buf);
    }

    return await this.analyzeDeviceImages(buffs, fields);
  }

  async downloadTelegramFile(fileId: string): Promise<Buffer> {
    // 1. getFile
    const fileResponse = await fetch(
      `https://api.telegram.org/bot${this.config.get<string>('BOT_TOKEN')!}/getFile?file_id=${fileId}`,
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const fileData = await fileResponse.json();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const filePath = fileData.result.file_path;

    // 2. download file
    const downloadResponse = await fetch(
      `https://api.telegram.org/file/bot${this.config.get<string>('BOT_TOKEN')!}/${filePath}`,
    );

    const arrayBuffer = await downloadResponse.arrayBuffer();

    return Buffer.from(arrayBuffer);
  }

  async analyzeDeviceImages(images: Buffer[], fields: string[]) {
    const imagesBase64 = images.map((buffer) => ({
      type: 'image_url' as const,
      image_url: {
        url: `data:image/jpeg;base64,${buffer.toString('base64')}`,
      },
    }));

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0,
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'device_analysis',
          schema: {
            type: 'object',
            properties: Object.fromEntries(
              fields.map((f) => [f, { type: ['string', 'null'] }]),
            ),
            required: fields,
            additionalProperties: false,
          },
        },
      },
      messages: [
        {
          role: 'system',
          content: `
            Система анализа изображений техники для акта приёмки в ремонт.

            Задача:
            Определить устройство и заполнить поля акта на основании фотографий.
            Определить точную модель по внешнему виду, если даже не видно маркировки.
            Особенно отмечай следы использования, потертости, маленькие царапины и сколы.
            Не заостряй внимание на цвете устройствы, если это не пятна чего либо.

            Правила:
            - Используй только визуально подтверждённые данные
            - Не выдумывай серийные номера и точные модели
            - Если информация отсутствует или не читается — ставь null
            - Если серийный номер не указан ставь --
            - Модель можно указывать только при уверенной визуальной идентификации
            - Игнорируй все посторонние объекты на изображении
            - Возвращай только данные для заполнения формы
            - Будь краток для максимальной точности и лаконичности
            `.trim(),
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Анализируй устройство по этим фото',
            },
            ...imagesBase64,
          ],
        },
      ],
    });

    const content = response.choices?.[0]?.message?.content;

    if (!content) {
      return { status: false, data: {} };
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { status: true, data: JSON.parse(content) };
  }

  // private async openaiReqest(request: string, content: string) {
  //   const res = await this.openai.chat.completions.create({
  //     model: 'gpt-4.1',
  //     messages: [
  //       {
  //         role: 'system',
  //         content: request,
  //       },
  //       { role: 'user', content: content },
  //     ],
  //     temperature: 0,
  //   });
  //   const jsonText = res.choices?.[0]?.message?.content ?? '{}';
  //   return JSON.parse(jsonText) as object;
  // }
}
