import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) {
    console.log('KafkaService start');
  }

  onModuleInit() {
    // const botService = ['newphoto'];
    const admin = ['getUsersAdmin', 'getCompaniesAdmin'];
    const auth = [
      'googleLoginReg',
      'googleLoginEnter',
      'telegramLoginReg',
      'telegramLoginEnter',
      'googleLoginEnterAdmin',
      'telegramLoginAdd',
      'googleLoginAdd',
    ];
    const text = ['textavailable', 'textlib'];
    const user = ['update-user', 'delete-account', 'getPhotos_auth', 'getPhotoBuffer_bot', 'deletePhoto_auth'];
    const status = ['edit-status', 'delete-status'];
    const device = ['edit-device', 'delete-device'];
    const field = ['edit-field', 'delete-field'];
    const service = ['update-service', 'delete-service'];
    const order = ['create-order', 'analyzPhotos_openai'];
    const comps = [
      'get-all-my-comps',
      'create-new-service',
      'create-new-company',
      'add-new-status',
      'add-new-device',
      'add-new-field',
      'delete-company',
      'update-status-line',
      'update-device-line',
      'update-field-line',
      'update-company',
    ];
    const patterns = [
      ...auth,
      ...text,
      ...user,
      ...comps,
      ...status,
      ...device,
      ...field,
      ...service,
      ...order,
      ...admin,
      // ...botService,
    ];

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
    return firstValueFrom<boolean | { status: boolean }>(
      this.kafkaClient.send(message, {
        value: data,
        key: message,
      }),
    );
  }
}
