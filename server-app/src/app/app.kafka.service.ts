import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
// import { ObjID } from 'src/user/interfaces/ObjID';

@Injectable()
export class AppKafkaService implements OnModuleInit {
  constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) {
    console.log('KafkaService start');
  }

  onModuleInit() {
    // await this.kafkaClient.connect();
    this.kafkaClient.subscribeToResponseOf('getUserByEmailOrUsername_app');
    // await this.kafkaClient.connect();
    // this.kafkaClient.emit('test', {
    //   value: {
    //     message: this.configService.get<string>('SERVICE_NAME'),
    //   },
    //   key: 123,
    // });
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
    return firstValueFrom<boolean | { status: boolean }>(
      this.kafkaClient.send(message, {
        value: data,
        key: message,
      }),
    );
  }
}
