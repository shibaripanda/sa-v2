import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    // Обязательно подписаться, чтобы работал ответ
    this.kafkaClient.subscribeToResponseOf('my-topic');
    await this.kafkaClient.connect();
  }

  sendMessage(message: string): any {
    return this.kafkaClient.emit('my-topic', {
      key: 'my-key',
      value: JSON.stringify({ message }),
    });
  }
}
