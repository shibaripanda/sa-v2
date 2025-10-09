import { Controller } from '@nestjs/common';
// import { MessagePattern, Payload } from '@nestjs/microservices';
// import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';
import { ConfigService } from '@nestjs/config';

@Controller()
export class KafkaController {
  constructor(private readonly configService: ConfigService) {}

  // Kafka Listener
  // @MessagePattern('test')
  // handleKafkaMessage(@Payload() value: KafkaMessage) {
  //   console.log(this.configService.get<string>('SERVICE_NAME'), value);
  // }
}
