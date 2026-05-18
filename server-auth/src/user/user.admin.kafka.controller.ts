import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
// import { ObjID } from './interfaces/ObjID';

@Controller()
export class UserAdminKafkaController {
  constructor(private userService: UserService) {}

  @MessagePattern('getUsersAdmin')
  async getUsersAdmin() {
    const res = await this.userService.getUsersAdmin();
    return {
      value: res,
      key: 'getUsersAdmin',
    };
  }
}
