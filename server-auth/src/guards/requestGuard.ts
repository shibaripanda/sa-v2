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
  requestData?: object;
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
      // const requestData = request.body['requestData'];
      const alowedRequests = ['name', 'timeLiveToken', 'delete-user'];
      if (
        !requestName ||
        // !requestData ||
        !alowedRequests.includes(requestName)
        // !requestData[requestName]
      )
        throw new UnauthorizedException('Unsupported request type');
      console.log(requestName);
      console.log(request.user);
      return true;
    }

    throw new UnauthorizedException('Unsupported request type');
  }
}
