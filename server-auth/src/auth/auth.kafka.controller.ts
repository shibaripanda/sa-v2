import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthKafkaController {
  constructor(private authService: AuthService) {}

  @MessagePattern('googleLogin')
  async googleLogin(
    @Payload() value: { data: { access_token: string }; ip: string },
  ) {
    const res = await this.authService.googleLogin(value.data, value.ip);
    return {
      value: res,
      key: 'googleLogin',
    };
  }

  @MessagePattern('telegramLogin')
  async telegramLogin(
    @Payload() value: { data: { access_token: string }; ip: string },
  ) {
    const res = await this.authService.telegramLogin(value.data, value.ip);
    return {
      value: res,
      key: 'telegramLogin',
    };
  }
}
