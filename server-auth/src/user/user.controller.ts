import { Body, Controller, Get, Ip, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UniversalJwtGuard } from 'src/guards/universalJwtGuard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserDocument } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(UniversalJwtGuard)
  @Get('/user')
  async getUser(@CurrentUser() user: UserDocument, @Ip() ip: string) {
    console.log(ip);
    console.log(user);
    return await this.userService.getUserById(user._id);
  }
}
