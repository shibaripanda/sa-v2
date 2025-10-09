import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './interfaces/user';
import { UniversalJwtGuard } from './guards/universalJwtGuard';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private appService: AppService) {}

  @UseGuards(UniversalJwtGuard)
  @Post('/create-new-company')
  createNewCompany(
    @Body() data: any,
    @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    console.log('dddddddddddddddd');
    return this.appService.createNewCompany(user._id);
  }
}
