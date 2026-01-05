import { Body, Controller, Post, UseGuards } from '@nestjs/common';
// import { CurrentUser } from './decorators/current-user.decorator';
// import { User } from './interfaces/user';
import { UniversalJwtGuard } from './guards/universalJwtGuard';
import { AppService } from './app.service';
import { AddNewStatusDto } from 'src/company/dto/addNewStatus.dto';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(UniversalJwtGuard)
  @Post('/delete-company')
  async deleteCompany(
    @Body() data: AddNewStatusDto,
    // @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    console.log(data);
    return await this.appService.deleteCompany(data.requestData.company_id);
  }

  @UseGuards(UniversalJwtGuard)
  @Post('/add-new-status')
  async addNewStatus(
    @Body() data: AddNewStatusDto,
    // @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    console.log(data);
    return await this.appService.addNewStatus(data.requestData.company_id);
  }

  //  @MessagePattern('delete-account')
  // async deleteAccount(
  //   @CurrentUser() user: UserDocument,
  //   @Payload() value: { user_id: Types.ObjectId },
  // ) {
  //   const res = await this.userService.deleteAccount(value.user_id);
  //   return {
  //     value: res,
  //     key: 'delete-account',
  //   };
  // }

  // @UseGuards(UniversalJwtGuard)
  // @Post('/get-all-my-comps')
  // getAllMyComps(
  //   @Body() data: any,
  //   @CurrentUser() user: User,
  //   // @Ip() ip: string,
  // ) {
  //   return this.appService.getAllMyComps(user._id);
  // }

  // @UseGuards(UniversalJwtGuard)
  // @Post('/create-new-service')
  // async createNewService(
  //   @Body() data: { company_id: Types.ObjectId },
  //   // @CurrentUser() user: User,
  //   // @Ip() ip: string,
  // ) {
  //   return await this.appService.createNewService(data.company_id);
  // }

  // @UseGuards(UniversalJwtGuard)
  // @Post('/create-new-company')
  // async createNewCompany(
  //   @Body() data: any,
  //   @CurrentUser() user: User,
  //   // @Ip() ip: string,
  // ) {
  //   return await this.appService.createNewCompany(user._id);
  // }
}
