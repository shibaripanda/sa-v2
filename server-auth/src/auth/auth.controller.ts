import { Body, Controller, Ip, Post } from '@nestjs/common';
import { GoogleLoginDto } from './dto/googleLogin.dto';
import { AuthService } from './auth.service';
import { TelegramLoginDto } from './dto/telegramLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/googleLogin')
  async googleLogin(@Body() data: GoogleLoginDto, @Ip() ip: string) {
    return this.authService.googleLogin(data, ip);
  }

  @Post('/telegramLogin')
  async telegramLogin(@Body() data: TelegramLoginDto, @Ip() ip: string) {
    return this.authService.telegramLogin(data, ip);
  }
}
