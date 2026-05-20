import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GoogleLoginDto } from './dto/googleLogin.dto';
import { UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { GoogleUserInfo } from './interfaces/GoogleInfo';
import { JwtService } from '@nestjs/jwt';
import { IpInfo } from './interfaces/IpInfo';
import { AuthDataValidator } from '@telegram-auth/server';
import { urlStrToAuthDataMap } from '@telegram-auth/server/utils';
import { ConfigService } from '@nestjs/config';
import { LoginData } from './auth.kafka.controller';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly httpService: HttpService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async telegramLoginAdd(data: object, _id: Types.ObjectId) {
    console.log('telegramLoginAdd', _id);
    const telegramUserData = await this.telegramAuth(data);
    if (telegramUserData) {
      const user: UserDocument | null = await this.userService.getTelegramUser(telegramUserData);
      if (user) {
        return { status: false, message: 'User already exists :-/' };
      }
      return { status: true, message: 'Your account is linked and will appear on your next login!' };
    }
    return { status: false, message: 'Error :-/' };
  }

  async googleLoginAdd(data: LoginData, _id: Types.ObjectId) {
    console.log('googleLoginAdd', _id);
    const googleUserData = await this.verifyIdTokenGoogle(data);
    if (googleUserData) {
      const user: UserDocument | null = await this.userService.getGoogleUser({
        email: googleUserData.email,
        name: googleUserData?.name,
      });
      if (user) {
        return { status: false, message: 'User already exists :-/' };
      }
      return { status: true, message: 'Your account is linked and will appear on your next login!' };
    }
    return { status: false, message: 'Error :-/' };
  }

  async telegramLoginEnter(data: object, ip: string) {
    const telegramUserData = await this.telegramAuth(data);
    if (telegramUserData) {
      const user: UserDocument | null = await this.userService.getTelegramUser(telegramUserData);
      if (user) {
        const location = await this.getLocation(ip);
        user.historyLogin.push({ date: Date.now(), ip, location });
        await user.save();
        return { ...this.generateToken(user, ip, location), status: true };
        // return this.generateToken(user, ip, location);
      }
      return { status: false, message: 'This user does not exist. :-/' };
    }
    return { status: false, message: 'Authorization error :-/' };
  }

  async googleLoginEnter(data: LoginData, ip: string) {
    console.log('googleLoginEnter');
    const googleUserData = await this.verifyIdTokenGoogle(data);
    if (googleUserData) {
      const user: UserDocument | null = await this.userService.getGoogleUser({
        email: googleUserData.email,
        name: googleUserData?.name,
      });
      if (user) {
        const location = await this.getLocation(ip);
        user.historyLogin.push({ date: Date.now(), ip, location });
        await user.save();
        return { ...this.generateToken(user, ip, location), status: true };
      }
      return { status: false, message: 'This user does not exist. :-/' };
    }
    return { status: false, message: 'Authorization error :-/' };
  }

  async googleLoginEnterAdmin(data: LoginData, ip: string) {
    console.log('googleLoginEnterAdmin');
    const googleUserData = await this.verifyIdTokenGoogle(data);
    if (googleUserData && this.adminEnterControlEmail(googleUserData.email)) {
      const user: UserDocument | null = await this.userService.getGoogleUser({
        email: googleUserData.email,
        name: googleUserData?.name,
      });
      if (user) {
        const location = await this.getLocation(ip);
        user.historyLogin.push({ date: Date.now(), ip, location });
        await user.save();
        return { ...this.generateToken(user, ip, location), status: true };
      }
      return { status: false, message: 'This user does not exist. :-/' };
    }
    return { status: false, message: 'Admin authorization error :-/' };
  }

  async telegramLoginReg(data: object, ip: string) {
    const telegramUserData = await this.telegramAuth(data);
    if (telegramUserData) {
      const user: UserDocument | null = await this.userService.getOrCreateTelegramUser(telegramUserData);
      if (user) {
        const location = await this.getLocation(ip);
        user.historyLogin.push({ date: Date.now(), ip, location });
        await user.save();
        return { ...this.generateToken(user, ip, location), status: true };
      }
      return { status: false, message: 'Error :-/' };
    }
    return { status: false, message: 'Authorization error :-/' };
  }

  async googleLoginReg(data: LoginData, ip: string) {
    const googleUserData = await this.verifyIdTokenGoogle(data);
    if (googleUserData) {
      const user: UserDocument | null = await this.userService.getOrCreateGoogleUser({
        email: googleUserData.email,
        name: googleUserData?.name,
      });
      if (user) {
        const location = await this.getLocation(ip);
        user.historyLogin.push({ date: Date.now(), ip, location });
        await user.save();
        return { ...this.generateToken(user, ip, location), status: true };
      }
      return { status: false, message: 'Error :-/' };
    }
    return { status: false, message: 'Authorization error :-/' };
  }

  private adminEnterControlEmail(email: string) {
    return this.configService.get<string>('ADMIN_EMAIL')!.split(',').includes(email);
  }

  private async getLocation(ip: string): Promise<string> {
    const link = `https://ipinfo.io/${ip}/json`;

    const response: AxiosResponse<IpInfo> = await firstValueFrom(this.httpService.get<IpInfo>(link));

    if (!response?.data) return 'noLocation';

    const parts = [response.data.country, response.data.region, response.data.city, response.data.postal].filter(
      Boolean,
    );

    return parts.length ? parts.join(', ') : 'noLocation';
  }

  private async telegramAuth(data: object) {
    const validator = new AuthDataValidator({
      botToken: this.configService.get<string>('BOT_TOKEN')!,
    });
    let dataCheck: string = '/auth/telegramLogin?';
    for (const key in data) {
      dataCheck = dataCheck + key + '=' + data[key] + '&';
    }
    const dataAuth = urlStrToAuthDataMap('http://localhost' + dataCheck);
    try {
      const user = await validator.validate(dataAuth);
      return user;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException({ message: 'Нет авторизации' });
    }
  }

  private async verifyIdTokenGoogle(data: GoogleLoginDto) {
    const link = 'https://www.googleapis.com/oauth2/v3/userinfo';
    const response: AxiosResponse<GoogleUserInfo> = await firstValueFrom(
      this.httpService.get(link, {
        headers: { Authorization: `Bearer ${data.access_token}` },
      }),
    );

    return response?.data ?? null;
  }

  private generateToken(user: UserDocument, ip: string, location: string) {
    const userObj = user.toJSON();
    const payload = {
      ...userObj,
      ip,
      location,
    };
    return {
      token: this.jwtService.sign(payload, { expiresIn: user.timeLiveToken }),
    };
  }
}
