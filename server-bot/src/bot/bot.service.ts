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

  async addNewPhoto(_id: string, photo: string) {
    const url = await this.bot.telegram.getFileLink(photo);
    const buffer = await (await fetch(url.href)).arrayBuffer();

    console.log(_id);

    // await this.kafkaService.emitAnyReq('newphoto', { hello: 'ssssss' });

    await this.kafkaService.emitAnyReq('newphoto', {
      image: Buffer.from(buffer).toString('base64'),
      _id: _id,
    });
  }
}
