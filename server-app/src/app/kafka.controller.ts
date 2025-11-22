import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
// import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { Types } from 'mongoose';

@Controller()
export class KafkaController {
  constructor(
    private readonly configService: ConfigService,
    private readonly appService: AppService,
  ) {}

  @MessagePattern('deleteAccount')
  async deleteAccount(@Payload() value: { message: Types.ObjectId }) {
    console.log(this.configService.get<string>('SERVICE_NAME'), value);
    const res = await this.appService.deleteAccount(value.message);
    return {
      value: { message: res },
      key: 123,
    };
  }
}
