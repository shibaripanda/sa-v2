import { Body, Controller, Ip, Post } from '@nestjs/common';
import { GoogleLoginDto } from './dto/googleLogin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/googleLogin')
  async googleLogin(@Body() data: GoogleLoginDto, @Ip() ip: string) {
    return this.authService.googleLogin(data, ip);
  }

  @Post('/telegramLogin')
  async telegramLogin(@Body() data: object, @Ip() ip: string) {
    console.log(data);
    return this.authService.telegramLogin(data, ip);
  }
}
