import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserDocument } from './user.schema';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { Types } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern('getUserById')
  async getUserById(
    @CurrentUser() user: UserDocument,
    @Payload() value: { user_id: Types.ObjectId },
  ) {
    const res = await this.userService.getUserById(value.user_id);
    return {
      value: res,
      key: 'getUserById',
    };
  }

  @MessagePattern('delete-account')
  async deleteAccount(
    @CurrentUser() user: UserDocument,
    @Payload() value: { user_id: Types.ObjectId },
  ) {
    const res = await this.userService.deleteAccount(value.user_id);
    return {
      value: res,
      key: 'delete-account',
    };
  }

  @MessagePattern('update-user')
  async updateUserData(
    @Payload()
    value: {
      user_id: Types.ObjectId;
      data: { [key: string]: string };
    },
  ) {
    const user = await this.userService.getUserById(value.user_id);
    if (user) throw new RpcException('USER_NOT_FOUND');
    const res = await this.userService.updateUserData(
      value.user_id,
      value.data,
    );
    return {
      value: res,
      key: 'update-user',
    };
  }
}
