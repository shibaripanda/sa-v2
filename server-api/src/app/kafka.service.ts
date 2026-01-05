import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {
    console.log('KafkaService start');
  }

  onModuleInit() {
    const auth = ['googleLogin', 'telegramLogin'];
    const text = ['textavailable', 'textlib'];
    const user = ['update-user', 'delete-account'];
    const comps = [
      'get-all-my-comps',
      'create-new-service',
      'create-new-company',
    ];
    const patterns = [...auth, ...text, ...user, ...comps];

    patterns.forEach((p) => this.kafkaClient.subscribeToResponseOf(p));
  }

  sendAnyReq(message: string, data: object | string) {
    return firstValueFrom<boolean>(
      this.kafkaClient.send(message, {
        value: data,
        key: message,
      }),
    );
  }
}
