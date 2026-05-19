import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
// import { ObjID } from './interfaces/ObjID';

@Controller()
export class UserAdminKafkaController {
  constructor(private userService: UserService) {}

  @MessagePattern('getUsersAdmin')
  async getUsersAdmin(
    @Payload()
    value: {
      page: number;
      limit: number;
    },
  ) {
    const res = await this.userService.getUsersAdmin(value);
    return {
      value: res,
      key: 'getUsersAdmin',
    };
  }
}
