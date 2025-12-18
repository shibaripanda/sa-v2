import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { GoogleLoginDto } from 'src/auth/dto/googleLogin.dto';

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
    // this.kafkaClient.subscribeToResponseOf('deleteAccount');
    // await this.kafkaClient.connect();
    // this.kafkaClient.emit('test', {
    //   value: {
    //     message: this.configService.get<string>('SERVICE_NAME'),
    //   },
    //   key: 123,
    // });
  }

  sendAnyReq(message: string, data: object) {
    this.kafkaClient.subscribeToResponseOf(message);
    return firstValueFrom<boolean>(
      this.kafkaClient.send(message, {
        value: data,
        key: 123,
      }),
    );
  }

  googleLogin(data: GoogleLoginDto, ip: string) {
    return firstValueFrom<boolean>(
      this.kafkaClient.send('googleLogin', {
        value: { data, ip },
        key: 123,
      }),
    );
  }
}
