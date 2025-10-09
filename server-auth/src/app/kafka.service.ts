import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
  ) {
    console.log('KafkaService start');
  }

  onModuleInit() {
    // this.kafkaClient.subscribeToResponseOf('hello');
    // await this.kafkaClient.connect();
    this.kafkaClient.emit('test', {
      value: {
        message: this.configService.get<string>('SERVICE_NAME'),
      },
      key: 123,
    });
  }
}
