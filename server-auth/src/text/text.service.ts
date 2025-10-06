import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import OpenAI from 'openai';
import {
  LengIndexes,
  LengInstruction,
  lengs,
  Text,
  textArray,
  TextDocument,
} from './text.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TextService implements OnModuleInit {
  private readonly clientAI: OpenAI;
  public textLib: Text[] = [];

  constructor(
    @InjectModel(Text.name) private textModel: Model<TextDocument>,
    private readonly configService: ConfigService,
  ) {
    this.clientAI = new OpenAI({
      apiKey: this.configService.get<string>('OPEN_AI_TOKEN'),
    });
  }

  async onModuleInit() {
    this.textLib = await this.getFullLib();
    console.log(this.textLib);
    await this.updateAppText(false, textArray, lengs);
  }

  async getFullLib() {
    return await this.textModel.find().lean();
  }

  getTextAvailable() {
    return lengs.map((l) => ({ title: l.title, index: l.index }));
  }

  getTextLib(lengIndex: string) {
    const text: Record<string, string> = {};

    if (Array.isArray(this.textLib)) {
      for (const t of this.textLib) {
        if (
          t &&
          typeof t.index === 'string' &&
          typeof t[lengIndex] === 'string'
        ) {
          text[t.index] = t[lengIndex];
        }
      }
    }
    return text;
  }

  async updateAppText(
    updateAll: boolean,
    instruction: LengInstruction[],
    lengsIndexes: LengIndexes[],
  ) {
    const dublicat =
      new Set(instruction.map((item) => item.index)).size !==
      instruction.map((item) => item.index).length;
    if (dublicat) {
      console.log('!!! WARNING !!! Дубликаты текстовых индексов');
      return;
    }

    let time: number = 0;
    let isNoItemToUpdate = false;

    const timer = setInterval(() => {
      console.log('UPDATING LENGUAGES...', time++);
    }, 1000);

    for (const i of instruction) {
      const existItem = await this.textModel.findOne({ index: i.index });
      if (!existItem || i.update || updateAll) {
        console.log(i.update ? 'update' : 'new', i.index);
        const newText: Record<string, string> = { ru: i.rutext };
        for (const l of lengsIndexes.filter((item) => item.index !== 'ru')) {
          const res = await this.openAiRequest(
            `Переведи на ${l.info} язык: "${i.rutext}", без кавычек и с большой буквы, в ответе только перевод`,
          );
          newText[l.index] = res;
        }
        await this.textModel.updateOne({ index: i.index }, newText, {
          upsert: true,
        });
        isNoItemToUpdate = true;
      } else {
        console.log('exist', i.index);
      }
    }
    if (isNoItemToUpdate) {
      this.textLib = await this.getFullLib();
    }
    clearInterval(timer);
    console.log(time, 'seconds');
  }

  async openAiRequest(request: string): Promise<string> {
    const chatCompletion = await this.clientAI.chat.completions.create({
      messages: [{ role: 'user', content: request }],
      model: 'gpt-3.5-turbo',
    });

    if (chatCompletion.choices[0].message.content) {
      return chatCompletion.choices[0].message.content;
    } else {
      return 'ooops... error';
    }
  }
}
