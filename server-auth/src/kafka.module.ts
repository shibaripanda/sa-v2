import { Module } from '@nestjs/common';
import {
  ClientsModule,
  Transport,
  ClientProviderOptions,
} from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService): ClientProviderOptions => ({
          transport: Transport.KAFKA,
          name: 'KAFKA_SERVICE',
          options: {
            client: {
              clientId: configService.get<string>('KAFKA_CLIENT_ID')!,
              brokers: [configService.get<string>('KAFKA_BROKER')!],
            },
            consumer: {
              groupId: configService.get<string>('KAFKA_GROUP_ID')!,
            },
          },
        }),
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class KafkaModule {}
