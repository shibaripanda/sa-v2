import { Controller, Post, Body } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // HTTP POST /send { message: "..." }
  @Post('send')
  async sendMessage(@Body('message') message: string): Promise<object> {
    await this.appService.sendMessage(message);
    return { status: 'Message sent' };
  }

  // Kafka Listener
  @MessagePattern('my-topic')
  handleKafkaMessage(@Payload() message: KafkaMessage) {
    const value = message.value;
    console.log('Received from Kafka:', value);
  }
}
