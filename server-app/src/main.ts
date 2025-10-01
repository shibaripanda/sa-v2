import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT')!;
  const SERVICE_NAME = configService.get<number>('SERVICE_NAME')!;
  await app.listen(PORT);
  console.log(`${SERVICE_NAME} started on port ${PORT}`);
}

void bootstrap();
