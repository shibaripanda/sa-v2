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
import { TelegramLoginDto } from './dto/telegramLogin.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly httpService: HttpService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async telegramLogin(data: TelegramLoginDto, ip: string) {
    const telegramUserData = await this.telegramAuth(data);
    if (telegramUserData) {
      const user: UserDocument | null =
        await this.userService.getOrCreateTelegramUser(telegramUserData);
      if (user) {
        const location = await this.getLocation(ip);
        user.historyLogin.push({ date: Date.now(), ip, location });
        await user.save();
        return this.generateToken(user, ip, location);
      }
    }
    throw new UnauthorizedException({ message: 'Error auth :-/' });
  }

  async googleLogin(data: GoogleLoginDto, ip: string) {
    const googleUserData = await this.verifyIdTokenGoogle(data);
    if (googleUserData) {
      const user: UserDocument | null =
        await this.userService.getOrCreateGoogleUser({
          email: googleUserData.email,
          name: googleUserData?.name,
        });
      if (user) {
        const location = await this.getLocation(ip);
        user.historyLogin.push({ date: Date.now(), ip, location });
        await user.save();
        return this.generateToken(user, ip, location);
      }
    }
    throw new UnauthorizedException({ message: 'Error auth :-/' });
  }

  private async getLocation(ip: string): Promise<string> {
    const link = `https://ipinfo.io/${ip}/json`;

    const response: AxiosResponse<IpInfo> = await firstValueFrom(
      this.httpService.get<IpInfo>(link),
    );

    if (!response?.data) return 'noLocation';

    const parts = [
      response.data.country,
      response.data.region,
      response.data.city,
      response.data.postal,
    ].filter(Boolean);

    return parts.length ? parts.join(', ') : 'noLocation';
  }

  private async telegramAuth(data: TelegramLoginDto) {
    const validator = new AuthDataValidator({
      botToken: this.configService.get<string>('BOT_TOKEN')!,
    });
    let dataCheck: string = '/aut/login?';
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
    const payload = {
      ...user,
      ip,
      location,
    };
    return {
      token: this.jwtService.sign(payload, { expiresIn: user.timeLiveToken }),
    };
  }
}
