import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
// import { Socket } from 'socket.io';
// import { User } from 'src/user/interfaces/user';

// interface RequestWithUser extends Request {
//   user?: User;
// }

// interface SocketWithUser extends Socket {
//   user?: User;
// }

@Injectable()
export class RoleGuard implements CanActivate {
  // constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('RoleGuard');

    const type = context.getType<'http' | 'ws'>();

    if (type === 'http') {
      const request = context.switchToHttp().getRequest<RequestWithUser>();
    }

    if (type === 'ws') {
      const client = context.switchToWs().getClient<SocketWithUser>();
    }

    throw new UnauthorizedException('Unsupported request type');
  }
}
