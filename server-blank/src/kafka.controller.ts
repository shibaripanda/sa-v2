import { Controller, Body } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';
import { ConfigService } from '@nestjs/config';
import * as chalk from 'chalk';

type KafkaMessageCustom = KafkaMessage & {
  message: string;
};

@Controller()
export class KafkaController {
  constructor(private readonly configService: ConfigService) {}

  // Kafka Listener
  @MessagePattern('test')
  handleKafkaMessage(@Payload() value: KafkaMessageCustom) {
    console.log(chalk.blue('Service activ: ', value.message));
  }
}
