// import { UseGuards } from '@nestjs/common';
// import { CallbackQuery, Message } from '@telegraf/types';
import {
  // Action,
  // Command,
  Ctx,
  InjectBot,
  // Hears,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
// import { AdminAccessGuard } from './guards/access-control.guard';
import { ConfigService } from '@nestjs/config';
import { BotService } from './bot.service';
import { UserContext } from './interfaces/MyContext';
import { UseGuards } from '@nestjs/common';
import { AccessGuard } from './guards/access-control.guard';
import { Telegraf } from 'telegraf';

@Update()
export class TelegramGateway {
  constructor(
    @InjectBot() private bot: Telegraf,
    private botService: BotService,
    private config: ConfigService,
  ) {}

  @UseGuards(AccessGuard)
  @Start()
  async start(@Ctx() ctx: UserContext) {
    console.log('@Start');
    await ctx.sendChatAction('typing');
  }

  @On('photo')
  async addNewPhoto(@Ctx() ctx: UserContext) {
    await this.botService.addNewPhoto(
      ctx.user._id,
      ctx.message.photo[ctx.message.photo.length - 1].file_id,
    );
  }
}
