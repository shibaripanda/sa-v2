import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { KafkaService } from 'src/app/kafka.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UniversalJwtGuard } from 'src/guards/universalJwtGuard';
import { User } from 'src/user/interfaces/user';
// import { Types } from 'mongoose';

@Controller('app')
export class AppController {
  constructor(private readonly kafkaService: KafkaService) {}

  @UseGuards(UniversalJwtGuard)
  @Post('/delete-company')
  async deleteCompany(
    @Body() data: { requestData: { company_id: string } },
    // @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    const res = await this.kafkaService.sendAnyReq('delete-company', {
      company_id: data.requestData.company_id,
    });
    return res;
  }

  @UseGuards(UniversalJwtGuard)
  @Post('/add-new-device')
  async addNewDevice(
    @Body() data: { requestData: { company_id: string } },
    // @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    const res = await this.kafkaService.sendAnyReq('add-new-device', {
      company_id: data.requestData.company_id,
    });
    return res;
  }

  @UseGuards(UniversalJwtGuard)
  @Post('/add-new-status')
  async addNewStatus(
    @Body() data: { requestData: { company_id: string } },
    // @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    const res = await this.kafkaService.sendAnyReq('add-new-status', {
      company_id: data.requestData.company_id,
    });
    return res;
  }

  @UseGuards(UniversalJwtGuard)
  @Post('/create-new-service')
  async createNewService(
    @Body() data: { company_id: string },
    // @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    const res = await this.kafkaService.sendAnyReq('create-new-service', {
      company_id: data.company_id,
    });
    return res;
  }

  @UseGuards(UniversalJwtGuard)
  @Post('/create-new-company')
  async createNewCompany(
    @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    const res = await this.kafkaService.sendAnyReq('create-new-company', {
      user_id: user._id,
    });
    return res;
  }

  @UseGuards(UniversalJwtGuard)
  @Post('/get-all-my-comps')
  async getAllMyComps(
    @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    const res = await this.kafkaService.sendAnyReq('get-all-my-comps', {
      user_id: user._id,
    });
    return res;
  }
}
