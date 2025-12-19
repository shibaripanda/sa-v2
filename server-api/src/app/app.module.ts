import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { KafkaController } from './kafka.controller';
import { KafkaService } from './kafka.service';
import { TextModule } from 'src/text/text.module';
import { UserModule } from 'src/user/user.module';
import { JwtConfigModule } from 'src/jwt/jwt.module';
// import { ScheduleModule } from '@nestjs/schedule';

@Global()
@Module({
  imports: [
    // ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../envs/.env.api-dev'],
    }),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: config.get<string>('KAFKA_CLIENT_ID')!,
              brokers: [config.get<string>('KAFKA_BROKER')!],
            },
            consumer: {
              groupId: config.get<string>('KAFKA_GROUP_ID')!,
              allowAutoTopicCreation: true,
              autoCommit: true,
            },
          },
        }),
      },
    ]),
    UserModule,
    TextModule,
    AuthModule,
    JwtConfigModule,
  ],
  controllers: [KafkaController],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class AppModule {}
