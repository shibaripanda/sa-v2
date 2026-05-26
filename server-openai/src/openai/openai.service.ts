import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai/index.js';
import { join } from 'path';
import { createReadStream } from 'fs';
import { tmpdir } from 'os';
import { writeFile, unlink } from 'fs/promises';

@Injectable()
export class OpenAIService {
  constructor(
    @Inject('OPENAI_CLIENT') private readonly openai: OpenAI,
    private config: ConfigService,
  ) {}

  async analyzVoice(voice: string) {
    const voiseBuffer = await this.downloadTelegramFile(voice);
    const textFromVoice = await this.transcribe(voiseBuffer);
    return await this.analyzeDeviceVoice(textFromVoice, ['Клиент', 'Адрес']);
  }

  async analyzImages(photos: string[], fields: string[], device: string, leng: string) {
    const buffs: Buffer[] = [];
    for (const photo of photos) {
      const buf = await this.downloadTelegramFile(photo);
      buffs.push(buf);
    }
    return await this.analyzeDeviceImages(buffs, fields, device, leng);
  }

  private async analyzeDeviceVoice(textFromVoice: string, fields: string[]) {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0,

      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'voice_analysis',
          schema: {
            type: 'object',
            properties: Object.fromEntries(fields.map((f) => [f, { type: ['string', 'null'] }])),
            required: fields,
            additionalProperties: false,
          },
        },
      },

      messages: [
        {
          role: 'system',
          content: `
          Система анализа голосового описания устройства.

          Задача:
          Извлечь данные для акта приёмки техники из текста.

          Правила:
          - Используй только явно сказанную информацию.
          - Не выдумывай данные.
          - Если данных нет — ставь null.
          - Возвращай только JSON.
        `.trim(),
        },
        {
          role: 'user',
          content: textFromVoice,
        },
      ],
    });

    const content = response.choices?.[0]?.message?.content;

    if (!content) {
      return { status: false, data: {} };
    }

    return {
      status: true,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: JSON.parse(content),
    };
  }

  private async analyzeDeviceImages(images: Buffer[], fields: string[], device: string, leng: string) {
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
            properties: Object.fromEntries(fields.map((f) => [f, { type: ['string', 'null'] }])),
            required: fields,
            additionalProperties: false,
          },
        },
      },
      messages: [
        {
          role: 'system',
          content: `
            Система анализа изображений техники (${device}) для акта приёмки в ремонт.

            Задача:
            Определить устройство и заполнить поля акта на основании фотографий.
            Определить точную модель по внешнему виду, если даже не видно маркировки.
            Особенно отмечай следы использования, потертости, даже маленькие царапины и сколы.
            Не заостряй внимание на цвете устройства, если это не пятна чего либо.
            Перед началом анализа, внимательно изучи все фото, чтобы составить полное представление о состоянии устройства.

            Правила:
            - Используй только визуально подтверждённые данные.
            - Не выдумывай серийные номера и точные модели.
            - Если информация отсутствует или не читается — ставь null.
            - Если серийный номер не указан ставь --.
            - Модель можно указывать только при уверенной визуальной идентификации.
            - Игнорируй все посторонние объекты на изображении.
            - Игнорируй такие отметки как отпечатки пальцев.
            - Возвращай только данные для заполнения формы.
            - Будь краток и точен.
            - Ответ должен быть на ${leng} языке.
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
    console.log(response.usage);

    if (!content) {
      return { status: false, data: {} };
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { status: true, data: JSON.parse(content) };
  }

  private async downloadTelegramFile(fileId: string): Promise<Buffer> {
    // 1. getFile
    const fileResponse = await fetch(
      `https://api.telegram.org/bot${this.config.get<string>('BOT_TOKEN')!}/getFile?file_id=${fileId}`,
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const fileData = await fileResponse.json();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const filePath = fileData.result.file_path;

    // 2. download file
    const downloadResponse = await fetch(`https://api.telegram.org/file/bot${this.config.get<string>('BOT_TOKEN')!}/${filePath}`);

    const arrayBuffer = await downloadResponse.arrayBuffer();

    return Buffer.from(arrayBuffer);
  }

  private async transcribe(audioBuffer: Buffer) {
    const filePath = join(tmpdir(), `voice-${Date.now()}.ogg`);
    await writeFile(filePath, audioBuffer);

    try {
      const stream = createReadStream(filePath);

      const transcription = await this.openai.audio.transcriptions.create({
        file: stream,
        model: 'gpt-4o-mini-transcribe', //'gpt-4o-transcribe',
      });

      return transcription.text;
    } finally {
      await unlink(filePath).catch(() => {});
    }
  }
}
