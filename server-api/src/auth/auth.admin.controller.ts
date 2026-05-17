import { Body, Controller, Ip, Post } from '@nestjs/common';
import { GoogleLoginDto } from './dto/googleLogin.dto';
import { KafkaService } from 'src/app/kafka.service';
// import { TelegramLoginDto } from './dto/telegramLogin.dto';

@Controller('admin')
export class AuthAdminController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post('/googleLogin')
  async googleLogin(@Body() data: GoogleLoginDto, @Ip() ip: string) {
    console.log('/googleLogin', data);
    // if (data.enterReg === 'reg') return await this.kafkaService.sendAnyReq('googleLoginReg', { data, ip });
    if (data.enterReg === 'enter') return await this.kafkaService.sendAnyReq('googleLoginEnterAdmin', { data, ip });
    return { status: false, message: 'Invalid enterReg value' };
  }

  // @Post('/telegramLogin')
  // async telegramLogin(@Body() data: { enterReg: string; user: object }, @Ip() ip: string) {
  //   console.log('/telegramLogin', data);
  //   if (data.enterReg === 'reg') return await this.kafkaService.sendAnyReq('telegramLoginReg', { data: data.user, ip });
  //   if (data.enterReg === 'enter')
  //     return await this.kafkaService.sendAnyReq('telegramLoginEnter', { data: data.user, ip });
  //   return { status: false, message: 'Invalid enterReg value' };
  // }
}
