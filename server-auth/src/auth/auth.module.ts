import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthKafkaController } from './auth.kafka.controller';
import { UserModule } from 'src/user/user.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UserModule, HttpModule],
  providers: [AuthService],
  controllers: [AuthKafkaController],
})
export class AuthModule {}
