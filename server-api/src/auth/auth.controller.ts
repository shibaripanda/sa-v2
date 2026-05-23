import { Body, Controller, Ip, Post, UseGuards } from '@nestjs/common';
import { GoogleLoginDto } from './dto/googleLogin.dto';
import { KafkaService } from 'src/app/kafka.service';
import { UniversalJwtGuard } from 'src/guards/universalJwtGuard';
import { User } from 'src/user/interfaces/user';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly kafkaService: KafkaService) {}

  @UseGuards(UniversalJwtGuard)
  @Post('/googleLoginAdd')
  async googleLoginAdd(@CurrentUser() user: User, @Body() data: GoogleLoginDto) {
    if (data.enterReg === 'add') return await this.kafkaService.sendAnyReq('googleLoginAdd', { data, _id: user._id });
    return { status: false, message: 'Invalid enterReg value' };
  }

  @UseGuards(UniversalJwtGuard)
  @Post('/telegramLoginAdd')
  async telegramLoginAdd(@CurrentUser() user: User, @Body() data: { enterReg: string; user: object }) {
    if (data.enterReg === 'add')
      return await this.kafkaService.sendAnyReq('telegramLoginAdd', { data: data.user, _id: user._id });
    return { status: false, message: 'Invalid enterReg value' };
  }

  @Post('/googleLogin')
  async googleLogin(@Body() data: GoogleLoginDto, @Ip() ip: string) {
    if (data.enterReg === 'reg') return await this.kafkaService.sendAnyReq('googleLoginReg', { data, ip });
    if (data.enterReg === 'enter') return await this.kafkaService.sendAnyReq('googleLoginEnter', { data, ip });
    return { status: false, message: 'Invalid enterReg value' };
  }

  @Post('/telegramLogin')
  async telegramLogin(@Body() data: { enterReg: string; user: object }, @Ip() ip: string) {
    if (data.enterReg === 'reg') return await this.kafkaService.sendAnyReq('telegramLoginReg', { data: data.user, ip });
    if (data.enterReg === 'enter') return await this.kafkaService.sendAnyReq('telegramLoginEnter', { data: data.user, ip });
    return { status: false, message: 'Invalid enterReg value' };
  }
}
