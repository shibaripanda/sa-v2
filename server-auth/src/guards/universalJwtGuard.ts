import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserDocument } from 'src/user/user.schema';

interface RequestWithUser extends Request {
  user?: UserDocument;
}

@Injectable()
export class UniversalJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const type = context.getType<'http'>();

    if (type === 'http') {
      const request: RequestWithUser = context.switchToHttp().getRequest();

      const authHeader = request.headers['authorization'];
      const token = authHeader?.split(' ')[1];
      if (!token) throw new UnauthorizedException('Token not provided');

      try {
        const payload = this.jwtService.verify<UserDocument>(token, {
          secret: process.env.SECRET_KEY || 'superrefreshkey',
        });
        request.user = payload;
        return true;
      } catch (e) {
        console.log(e);
        throw new UnauthorizedException('Invalid token');
      }
    }

    throw new UnauthorizedException('Unsupported request type');
  }
}
