import { Body, Controller, Ip, Post } from '@nestjs/common';
import { GoogleLoginDto } from './dto/googleLogin.dto';
import { KafkaService } from 'src/app/kafka.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post('/googleLogin')
  async googleLogin(@Body() data: GoogleLoginDto, @Ip() ip: string) {
    return await this.kafkaService.sendAnyReq('googleLogin', { data, ip });
  }

  @Post('/telegramLogin')
  async telegramLogin(@Body() data: object, @Ip() ip: string) {
    return await this.kafkaService.sendAnyReq('telegramLogin', { data, ip });
  }
}
