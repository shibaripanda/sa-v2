import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
// import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT')!;
  const SERVICE_NAME = configService.get<number>('SERVICE_NAME')!;
  try {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: { brokers: [configService.get<string>('KAFKA_BROKER')!] },
        consumer: {
          groupId: 'Lisener ' + configService.get<string>('KAFKA_GROUP_ID')!,
        },
      },
    });
    await app.startAllMicroservices();
  } catch (error) {
    console.log(error);
  }
  // app.useGlobalPipes(new ValidationPipe());
  // app.enableCors({
  //   origin: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204,
  // });
  // app.set('trust proxy', true);
  await app.listen(PORT);
  console.log(`${SERVICE_NAME} started on port ${PORT}`);
}

void bootstrap();
