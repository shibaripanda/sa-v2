import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

export interface LoginData {
  access_token: string;
  enterReg: 'enter' | 'reg';
}

@Controller()
export class AuthKafkaController {
  constructor(private authService: AuthService) {}

  @MessagePattern('googleLoginEnter')
  async googleLoginEnter(
    @Payload()
    value: {
      data: LoginData;
      ip: string;
    },
  ) {
    console.log('googleLoginEnter', value.data);
    const res = await this.authService.googleLoginEnter(value.data, value.ip);
    console.log(res);
    return {
      value: res,
      key: 'googleLoginEnter',
    };
  }

  @MessagePattern('telegramLoginEnter')
  async telegramLoginEnter(
    @Payload()
    value: {
      data: object;
      ip: string;
    },
  ) {
    const res = await this.authService.telegramLoginEnter(value.data, value.ip);
    console.log(res);
    return {
      value: res,
      key: 'telegramLoginEnter',
    };
  }

  @MessagePattern('googleLoginReg')
  async googleLoginReg(
    @Payload()
    value: {
      data: LoginData;
      ip: string;
    },
  ) {
    const res = await this.authService.googleLoginReg(value.data, value.ip);
    return {
      value: res,
      key: 'googleLoginReg',
    };
  }

  @MessagePattern('telegramLoginReg')
  async telegramLoginReg(
    @Payload()
    value: {
      data: object;
      ip: string;
    },
  ) {
    const res = await this.authService.telegramLoginReg(value.data, value.ip);
    return {
      value: res,
      key: 'telegramLoginReg',
    };
  }
}
