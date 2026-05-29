import { Controller } from '@nestjs/common';
import {
  // EventPattern,
  MessagePattern,
  Payload,
  // RpcException,
} from '@nestjs/microservices';
import { BotService } from './bot.service';
// import { Types } from 'mongoose';

@Controller()
export class BotKafkaController {
  constructor(private botService: BotService) {}

  @MessagePattern('getPhotoBuffer_bot')
  async getPhotos(@Payload() value: { photo: string }) {
    const res = await this.botService.getBuffer(value.photo);
    return {
      value: res,
      key: 'getPhotoBuffer_bot',
    };
  }
}
