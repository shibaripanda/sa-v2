import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { EventPattern, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { ObjID } from './interfaces/ObjID';
import { Types } from 'mongoose';

@Controller()
export class UserKafkaController {
  constructor(private userService: UserService) {}

  @MessagePattern('getUserByEmailOrUsername_app')
  async getUserByEmailOrUsername(@Payload() value: { email?: string; username?: string }) {
    const res = await this.userService.getUserByEmailOrUsername(value.email, value.username);
    console.log('auth', res);
    return {
      value: { user_id: res },
      key: 'getUserByEmailOrUsername_app',
    };
  }

  @MessagePattern('deletePhoto_auth')
  async deletePhoto(@Payload() value: { _id: ObjID; deletePhoto: string }) {
    const res = await this.userService.deletePhoto(value._id, value.deletePhoto);
    return {
      value: { photos: res?.photos },
      key: 'deletePhoto_auth',
    };
  }

  @MessagePattern('getPhotos_auth')
  async getPhotos(@Payload() value: { _id: ObjID }) {
    const res = await this.userService.getPhotos(value._id);
    return {
      value: { photos: res?.photos },
      key: 'getPhotos_auth',
    };
  }

  @EventPattern('addNewPhoto_auth')
  async addNewPhoto(@Payload() data: { _id: Types.ObjectId; photo: string }) {
    await this.userService.addNewPhoto(data._id, data.photo);
  }

  @MessagePattern('getUserByTgId')
  async getUserByTgId(@Payload() value: { telegramId: number }) {
    const res = await this.userService.getUserByTgId(value.telegramId);
    return {
      value: { user: res },
      key: 'getUserByTgId',
    };
  }

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
      data: { [key: string]: string | number };
    },
  ) {
    // await this.userService.testUser();
    console.log(value.data);
    const user = await this.userService.getUserById(value.user_id);
    if (!user) throw new RpcException('USER_NOT_FOUND');
    const res = await this.userService.updateUserData(value.user_id, value.data);
    return {
      value: res,
      key: 'update-user',
    };
  }
}
