import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppKafkaService } from './app.kafka.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { JwtConfigModule } from 'src/jwt/jwt.module';
import { GlobalConfigModule } from 'src/globalConfig/globalConfig.module';

@Global()
@Module({
  imports: [
    GlobalConfigModule,
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_TOKEN')!,
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
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     uri: config.get<string>('MONGO_TOKEN')!,
    //   }),
    // }),
    // ClientsModule.registerAsync([
    //   {
    //     name: 'KAFKA_SERVICE',
    //     imports: [ConfigModule],
    //     inject: [ConfigService],
    //     useFactory: (config: ConfigService) => ({
    //       transport: Transport.KAFKA,
    //       options: {
    //         client: {
    //           clientId: config.get<string>('KAFKA_CLIENT_ID')!,
    //           brokers: [config.get<string>('KAFKA_BROKER')!],
    //         },
    //         consumer: {
    //           groupId: config.get<string>('KAFKA_GROUP_ID')!,
    //           allowAutoTopicCreation: true,
    //           autoCommit: true,
    //         },
    //       },
    //     }),
    //   },
    // ]),
    UserModule,
    AuthModule,
    JwtConfigModule,
  ],
  controllers: [],
  providers: [AppKafkaService],
  exports: [AppKafkaService],
})
export class AppModule {}
