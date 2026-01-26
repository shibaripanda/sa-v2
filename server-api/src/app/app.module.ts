import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { KafkaService } from './kafka.service';
import { TextModule } from 'src/text/text.module';
import { UserModule } from 'src/user/user.module';
import { JwtConfigModule } from 'src/jwt/jwt.module';
import { AppController } from './app.controller';
import { StatusController } from './status.controller';
import { CompanyController } from './company.controller';
import { GlobalConfigModule } from 'src/globalConfig/globalConfig.module';
import { DeviceController } from './device.controller';

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
    UserModule,
    TextModule,
    AuthModule,
    JwtConfigModule,
  ],
  controllers: [
    AppController,
    StatusController,
    CompanyController,
    DeviceController,
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class AppModule {}
