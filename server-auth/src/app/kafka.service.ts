import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
  ) {
    console.log('KafkaService start');
  }

  onModuleInit() {
    // await this.kafkaClient.connect();
    this.kafkaClient.subscribeToResponseOf('deleteAccount');
    // await this.kafkaClient.connect();
    // this.kafkaClient.emit('test', {
    //   value: {
    //     message: this.configService.get<string>('SERVICE_NAME'),
    //   },
    //   key: 123,
    // });
  }

  deleteAccount(_id: Types.ObjectId) {
    return firstValueFrom<boolean>(
      this.kafkaClient.send('deleteAccount', {
        value: { message: _id },
        key: 123,
      }),
    );
  }
}
