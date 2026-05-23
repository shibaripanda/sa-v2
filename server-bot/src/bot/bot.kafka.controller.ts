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
    console.log(value);
    const res = await this.botService.getBuffer(value.photo);
    return {
      value: res,
      key: 'getPhotoBuffer_bot',
    };
  }

  // @EventPattern('addNewPhoto_auth')
  // async addNewPhoto(@Payload() data: { _id: Types.ObjectId; photo: string }) {
  //   await this.userService.addNewPhoto(data._id, data.photo);
  // }
}
