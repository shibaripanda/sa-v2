import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaController } from './kafka.controller';
import { KafkaService } from './kafka.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { TextModule } from 'src/text/text.module';
import { JwtConfigModule } from 'src/jwt/jwt.module';

@Global()
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../envs/.env.auth-dev'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_TOKEN')!,
      }),
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
    AuthModule,
    TextModule,
    JwtConfigModule,
  ],
  controllers: [KafkaController],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class AppModule {}
