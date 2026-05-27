import { Injectable } from '@nestjs/common';
// import { InlineKeyboardButton } from '@telegraf/types';
import { InjectBot } from 'nestjs-telegraf';
import { KafkaService } from 'src/app/kafka.service';
import { Telegraf } from 'telegraf';

@Injectable()
export class BotService {
  constructor(
    @InjectBot() private bot: Telegraf,
    private kafkaService: KafkaService,
  ) {}

  async getBuffer(photo: string) {
    const url = await this.bot.telegram.getFileLink(photo);
    const buffer = await (await fetch(url.href)).arrayBuffer();
    return { image: Buffer.from(buffer).toString('base64') };
  }

  async addNewVoice(_id: string, voice: string) {
    await this.kafkaService.emitAnyReq('newVoice_api', { _id, voice });
  }

  async addNewPhoto(_id: string, photo: string) {
    await this.kafkaService.emitAnyReq('addNewPhoto_auth', {
      _id,
      photo,
    });
    await this.kafkaService.emitAnyReq('newPhoto_api', { _id });
  }
}
