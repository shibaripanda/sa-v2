import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
  ) {
    console.log('KafkaService start');
  }

  async onModuleInit() {
    // this.kafkaClient.subscribeToResponseOf('hello');
    console.log(
      this.configService.get<string>('SERVICE_NAME'),
      'conecting.....',
    );
    await this.kafkaClient.connect();
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  ping() {
    console.log(`CRON ${this.configService.get<string>('SERVICE_NAME')}`);
    this.kafkaClient.emit('test', {
      value: {
        message: `Hello from ${this.configService.get<string>('SERVICE_NAME')}`,
      },
      key: 123,
    });
  }

  sendMessage(message: string): any {
    return this.kafkaClient.emit('my-topic', {
      key: 'my-key',
      value: JSON.stringify({ message }),
    });
  }
}
