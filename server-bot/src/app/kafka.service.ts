import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) {
    console.log('KafkaService start');
  }

  onModuleInit() {
    const auth = ['getUserByTgId'];

    const patterns = [...auth];
    patterns.forEach((p) => this.kafkaClient.subscribeToResponseOf(p));
  }

  emitAnyReq(message: string, data: object | string) {
    return firstValueFrom<boolean | { status: boolean }>(
      this.kafkaClient.emit(message, {
        value: data,
        key: message,
      }),
    );
  }

  sendAnyReq(message: string, data: object | string) {
    return firstValueFrom<any>(
      this.kafkaClient.send(message, {
        value: data,
        key: message,
      }),
    );
  }
}
