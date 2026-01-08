import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../envs/.env.api-dev'],
    }),
  ],
  exports: [ConfigModule],
})
export class GlobalConfigModule {}
