import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UniversalJwtGuard } from 'src/guards/universalJwtGuard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UpdateUserDataDto } from './dto/updateUserData.dto';
import { RequestGuard } from 'src/guards/requestGuard';
import { User } from './interfaces/user';
import { KafkaService } from 'src/app/kafka.service';

@Controller('user')
export class UserController {
  constructor(private readonly kafkaService: KafkaService) {}

  @UseGuards(UniversalJwtGuard) //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Добавить защиты
  @Get('/user')
  async getUserById(
    @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    return await this.kafkaService.sendAnyReq('getUserById', {
      user_id: user._id,
    });
  }

  @UseGuards(UniversalJwtGuard) //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Добавить защиты
  @Get('/delete-account')
  async deleteAccount(
    @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    return await this.kafkaService.sendAnyReq('delete-account', {
      user_id: user._id,
    });
  }

  @UseGuards(UniversalJwtGuard, RequestGuard)
  @Post('/update-user')
  async updateUserData(
    @CurrentUser() user: User,
    @Body() data: UpdateUserDataDto,
    // @Ip() ip: string,
  ) {
    try {
      return await this.kafkaService.sendAnyReq('update-user', {
        user_id: user._id,
        data: data.requestData,
      });
      // return res;
    } catch {
      throw new InternalServerErrorException();
      // return false;
    }
  }
}
