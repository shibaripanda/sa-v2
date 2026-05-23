import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BotModule } from 'src/bot/bot.module';
import { GlobalConfigModule } from 'src/globalConfig/globalConfig.module';
import { KafkaService } from './kafka.service';

@Global()
@Module({
  imports: [
    GlobalConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get<string>('KAFKA_CLIENT_ID')!,
              brokers: [configService.get<string>('KAFKA_BROKER')!],
            },
            consumer: {
              groupId: configService.get<string>('KAFKA_GROUP_ID')!,
              allowAutoTopicCreation: true,
              autoCommit: true,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
    BotModule,
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class AppModule {}
