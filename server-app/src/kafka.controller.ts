import { Controller, Post, Body } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';
import { ConfigService } from '@nestjs/config';

@Controller()
export class KafkaController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  // HTTP POST /send { message: "..." }
  @Post('send')
  async sendMessage(@Body('message') message: string): Promise<object> {
    await this.appService.sendMessage(message);
    return { status: 'Message sent' };
  }

  // Kafka Listener
  @MessagePattern('hello')
  handleKafkaMessage(@Payload() value: KafkaMessage) {
    console.log(this.configService.get<string>('SERVICE_NAME'), value);
  }
}
