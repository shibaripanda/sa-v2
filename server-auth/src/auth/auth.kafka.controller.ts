import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Types } from 'mongoose';

export interface LoginData {
  access_token: string;
  enterReg: 'enter' | 'reg';
}

@Controller()
export class AuthKafkaController {
  constructor(private authService: AuthService) {}

  @MessagePattern('googleLoginAdd')
  async googleLoginAdd(
    @Payload()
    value: {
      data: LoginData;
      _id: Types.ObjectId;
    },
  ) {
    const res = await this.authService.googleLoginAdd(value.data, value._id);
    return {
      value: res,
      key: 'googleLoginAdd',
    };
  }

  @MessagePattern('telegramLoginAdd')
  async telegramLoginAdd(
    @Payload()
    value: {
      data: object;
      _id: Types.ObjectId;
    },
  ) {
    const res = await this.authService.telegramLoginAdd(value.data, value._id);
    return {
      value: res,
      key: 'telegramLoginAdd',
    };
  }

  @MessagePattern('googleLoginEnter')
  async googleLoginEnter(
    @Payload()
    value: {
      data: LoginData;
      ip: string;
    },
  ) {
    const res = await this.authService.googleLoginEnter(value.data, value.ip);
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
