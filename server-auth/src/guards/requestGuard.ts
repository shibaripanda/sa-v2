import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserDocument } from 'src/user/user.schema';

interface RequestBody {
  requestName?: string;
}

interface RequestWithUser extends Request {
  user?: UserDocument;
  body: RequestBody;
}

@Injectable()
export class RequestGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const type = context.getType<'http'>();

    if (type === 'http') {
      const request: RequestWithUser = context.switchToHttp().getRequest();
      const requestName = request.body['requestName'];
      console.log(requestName);
      console.log(request.user);
      return true;
    }

    throw new UnauthorizedException('Unsupported request type');
  }
}
