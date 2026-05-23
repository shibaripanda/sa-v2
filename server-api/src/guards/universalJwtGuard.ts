import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Socket } from 'socket.io';
import { User } from 'src/user/interfaces/user';

interface RequestWithUser extends Request {
  user?: User;
}

interface SocketWithUser extends Socket {
  user?: User;
}

@Injectable()
export class UniversalJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const type = context.getType<'http' | 'ws'>();

    // ================= HTTP =================
    if (type === 'http') {
      const request: RequestWithUser = context.switchToHttp().getRequest();

      const authHeader = request.headers['authorization'];
      const token = authHeader?.split(' ')[1];

      if (!token) throw new UnauthorizedException('Token not provided');

      try {
        const payload = this.jwtService.verify<User>(token, {
          secret: process.env.SECRET_KEY || 'superrefreshkey',
        });

        request.user = payload;
        return true;
      } catch (e) {
        console.log(e);
        throw new UnauthorizedException('Invalid token');
      }
    }

    // ================= WS =================
    if (type === 'ws') {
      const client: SocketWithUser = context.switchToWs().getClient<Socket>();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.split(' ')[1];

      if (!token) throw new UnauthorizedException('Token not provided');

      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const payload = this.jwtService.verify<User>(token, {
          secret: process.env.SECRET_KEY || 'superrefreshkey',
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        client.data.user = payload; // или client.user = payload
        return true;
      } catch (e) {
        console.log(e);
        throw new UnauthorizedException('Invalid token');
      }
    }

    throw new UnauthorizedException('Unsupported request type');
  }
}

// import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';
// import { User } from 'src/user/interfaces/user';

// interface RequestWithUser extends Request {
//   user?: User;
// }

// @Injectable()
// export class UniversalJwtGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}

//   canActivate(context: ExecutionContext): boolean {
//     const type = context.getType<'http'>();

//     if (type === 'http') {
//       const request: RequestWithUser = context.switchToHttp().getRequest();

//       const authHeader = request.headers['authorization'];
//       const token = authHeader?.split(' ')[1];
//       if (!token) throw new UnauthorizedException('Token not provided');

//       try {
//         const payload = this.jwtService.verify<User>(token, {
//           secret: process.env.SECRET_KEY || 'superrefreshkey',
//         });
//         request.user = payload;
//         return true;
//       } catch (e) {
//         console.log(e);
//         throw new UnauthorizedException('Invalid token');
//       }
//     }

//     throw new UnauthorizedException('Unsupported request type');
//   }
// }
