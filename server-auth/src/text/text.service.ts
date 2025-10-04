import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import OpenAI from 'openai';
import { lengs, Text, TextDocument } from './text.schema';
import { Model } from 'mongoose';

interface LengData {
  rutext: string;
  index: string;
  info_data: string;
  update?: boolean;
}
export interface LengDataStart {
  title: string;
  index: string;
  info: string;
}
interface LengResult {
  [key: string]: string;
}
interface NewLengPack {
  [key: string]: LengResult;
}

@Injectable()
export class TextService {
  private readonly clientAI: OpenAI;

  constructor(@InjectModel(Text.name) private textModel: Model<TextDocument>) {
    this.clientAI = new OpenAI({ apiKey: process.env.OPENAI_KEY });
  }

  private textArray: LengData[] = [
    { rutext: 'Привет', index: 'hello', info_data: 'приветствие' },
    {
      rutext: 'Пользователь не найден или произошла ошибка',
      index: 'userError1',
      info_data: 'юзер не найден',
    },
  ];

  getTextAvailable() {
    return lengs;
  }

  getTextLib(data: string) {
    const text: { [key: string]: string } = {};
    for (const t of global.appText as TextDocument[]) {
      text[t.index] = t[data];
    }
    return text;
  }

  async getAllLib() {
    global.appText = await this.textModel.find();
    return global.appText as TextDocument[];
  }

  async updateAppText() {
    const appText = await this.getAllLib();
    const newAppText = await this.getLenguagesFromAI(
      false,
      this.textArray,
      lengs,
      appText,
    );
    if (JSON.stringify(appText) !== JSON.stringify(newAppText)) {
      await this.appMongo.findOneAndUpdate(
        { mainServerAppSettings: 'mainServerAppSettings' },
        { text: newAppText },
      );
      console.log('Текс обновлен');
    } else {
      console.log('Текст не требует обновления');
    }
    return this.getText();
  }

  getLenguagesFromAI = async (
    updateAll: boolean,
    indata: LengData[],
    lenguages: LengDataStart[],
    existLengPack: NewLengPack,
  ) => {
    function dublicateIndexControl() {
      return (
        new Set(indata.map((item) => item.index)).size !==
        indata.map((item) => item.index).length
      );
    }

    if (dublicateIndexControl()) {
      console.log('!!! WARNING !!! Дубликаты текстовых индексов');
      return existLengPack;
    }

    const newLengPack: NewLengPack = {};
    let time: number = 0;

    const timer = setInterval(() => {
      console.log('UPDATING LENGUAGES...', time++);
    }, 1000);
    for (const i of indata) {
      if (
        typeof existLengPack[i.index] === 'undefined' ||
        updateAll ||
        i.update
      ) {
        console.log('new', i.index);
        const newRes: LengResult = { info_data: i.info_data, ru: i.rutext };
        for (const l of lenguages.filter((item) => item.index !== 'ru')) {
          newRes[l.index] = await this.openAiRequest(
            `Переведи на ${l.info} язык: "${i.rutext}", без кавычек и с большой буквы, в ответе только перевод`,
          );
        }
        newLengPack[i.index] = newRes;
      } else {
        console.log('exist', i.index);
        newLengPack[i.index] = existLengPack[i.index];
      }
    }
    clearInterval(timer);
    console.log(time, 'seconds');
    return newLengPack;
  };

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
