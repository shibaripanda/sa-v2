import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT_AUTH', 3000);
  const kafkaBroker = configService.get<string>('KAFKA_BROKER')!;
  const kafkaClientId = configService.get<string>('KAFKA_CLIENT_ID')!;
  const kafkaGroupId = configService.get<string>('KAFKA_GROUP_ID')!;

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: kafkaClientId,
        brokers: [kafkaBroker],
      },
      consumer: {
        groupId: kafkaGroupId,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);
  console.log(`Auth service listening on port ${port}`);
}

void bootstrap();
