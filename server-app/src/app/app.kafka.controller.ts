import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Types } from 'mongoose';

@Controller()
export class AppKafkaController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('create-new-company')
  async createNewCompany(@Payload() value: { user_id: Types.ObjectId }) {
    const res = await this.appService.createNewCompany(value.user_id);
    return {
      value: res,
      key: Date.now(),
    };
  }

  @MessagePattern('create-new-service')
  async createNewService(@Payload() value: { company_id: Types.ObjectId }) {
    const res = await this.appService.createNewService(value.company_id);
    return {
      value: res,
      key: Date.now(),
    };
  }

  @MessagePattern('get-all-my-comps')
  async getAllMyComps(@Payload() value: { user_id: Types.ObjectId }) {
    const res = await this.appService.getAllMyComps(value.user_id);
    return {
      value: res,
      key: Date.now(),
    };
  }

  @MessagePattern('deleteAccount')
  async deleteAccount(@Payload() value: { message: Types.ObjectId }) {
    const res = await this.appService.deleteAccount(value.message);
    return {
      value: { message: res },
      key: Date.now(),
    };
  }
}
