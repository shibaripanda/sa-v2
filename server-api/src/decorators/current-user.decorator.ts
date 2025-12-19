import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/user/interfaces/user';

interface RequestWithUser extends Request {
  user?: User;
}

// interface SocketWithUser extends Socket {
//   data: {
//     user?: User;
//   };
// }

/**
 * Универсальный декоратор для получения текущего пользователя
 * Работает и в HTTP, и в WebSocket контекстах.
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User | undefined => {
    const type = context.getType<'http' | 'ws'>();

    if (type === 'http') {
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      return request.user;
    }

    // if (type === 'ws') {
    //   const client = context.switchToWs().getClient<SocketWithUser>();
    //   return client.data.user;
    // }

    return undefined;
  },
);
