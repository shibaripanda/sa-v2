import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {
    console.log('KafkaService start');
  }

  async onModuleInit() {
    await this.kafkaClient.connect();
    // this.kafkaClient.subscribeToResponseOf('hello');
  }

  sendMessage(message: string): any {
    return this.kafkaClient.emit('my-topic', {
      key: 'my-key',
      value: JSON.stringify({ message }),
    });
  }
}
