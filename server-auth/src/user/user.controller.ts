import { Body, Controller, Get, Ip, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UniversalJwtGuard } from 'src/guards/universalJwtGuard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserDocument } from './user.schema';
import { UpdateUserDataDto } from './dto/updateUserData.dto';
import { RequestGuard } from 'src/guards/requestGuard';

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

  @UseGuards(UniversalJwtGuard) //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Добавить защиты
  @Get('/delete-user')
  deleteUser(
    @CurrentUser() user: UserDocument,
    // @Ip() ip: string,
  ) {
    return this.userService.deleteUser(user._id);
  }

  @UseGuards(UniversalJwtGuard, RequestGuard)
  @Post('/update-user')
  async updateUserData(
    @CurrentUser() user: UserDocument,
    @Body() data: UpdateUserDataDto,
    // @Ip() ip: string,
  ) {
    console.log(data);
    // console.log(user);
    return await this.userService.updateUserData(user._id, data.requestData);
  }
}
