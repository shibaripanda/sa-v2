import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { ObjID } from './interfaces/ObjID';

@Controller()
export class UserKafkaController {
  constructor(private userService: UserService) {}

  @MessagePattern('getUserById')
  async getUserById(@Payload() value: { user_id: ObjID }) {
    const res = await this.userService.getUserById(value.user_id);
    return {
      value: res,
      key: 'getUserById',
    };
  }

  @MessagePattern('delete-account')
  async deleteAccount(@Payload() value: { user_id: ObjID }) {
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
      user_id: ObjID;
      data: { [key: string]: string };
    },
  ) {
    const user = await this.userService.getUserById(value.user_id);
    if (!user) throw new RpcException('USER_NOT_FOUND');
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
