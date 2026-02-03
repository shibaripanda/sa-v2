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
    const status = ['edit-status', 'delete-status'];
    const device = ['edit-device', 'delete-device'];
    const field = ['edit-field', 'delete-field'];
    const service = ['update-service', 'delete-service'];
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
    ];

    patterns.forEach((p) => this.kafkaClient.subscribeToResponseOf(p));
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
