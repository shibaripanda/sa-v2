import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CompanyModule } from '../company/company.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceModule } from 'src/device/device.module';
import { PartModule } from 'src/part/part.module';
import { RoleModule } from 'src/role/role.module';
import { ServiceModule } from 'src/service/service.module';
import { ShopModule } from 'src/shop/shop.module';
import { StaffUserModule } from 'src/staff-user/staff-user.module';
import { StatusModule } from 'src/status/status.module';
import { WorkModule } from 'src/work/work.module';
import { AppService } from './app.service';
import { useGlobalAutopopulatePlugin } from './plugins/populateMongo';
import { Connection } from 'mongoose';
import { AppKafkaController } from './app.kafka.controller';
import { GlobalConfigModule } from 'src/globalConfig/globalConfig.module';

@Global()
@Module({
  imports: [
    GlobalConfigModule,
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_TOKEN')!,
        connectionFactory: (connection: Connection) => {
          useGlobalAutopopulatePlugin(connection);
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
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
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY')!,
      }),
      inject: [ConfigService],
    }),
    CompanyModule,
    DeviceModule,
    PartModule,
    RoleModule,
    ServiceModule,
    ShopModule,
    StaffUserModule,
    StatusModule,
    WorkModule,
  ],
  controllers: [AppKafkaController],
  providers: [AppService],
  exports: [ClientsModule, JwtModule],
})
export class AppModule {}
