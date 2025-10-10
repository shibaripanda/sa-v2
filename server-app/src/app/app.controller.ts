import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './interfaces/user';
import { UniversalJwtGuard } from './guards/universalJwtGuard';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(UniversalJwtGuard)
  @Post('/get-all-my-companys-and-services')
  getAllMyCompanysAndSrvices(
    @Body() data: any,
    @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    return this.appService.getAllMyCompanysAndSrvices(user._id);
  }

  @UseGuards(UniversalJwtGuard)
  @Post('/create-new-company')
  async createNewCompany(
    @Body() data: any,
    @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    return await this.appService.createNewCompany(user._id);
  }
}
