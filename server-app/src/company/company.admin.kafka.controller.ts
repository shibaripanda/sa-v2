import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CompanyAdminService } from './company.admin.service';

@Controller()
export class CompanyAdminKafkaController {
  constructor(private companyAdminService: CompanyAdminService) {}

  @MessagePattern('getCompaniesAdmin')
  async getCompaniesAdmin(@Payload() value: { page: number; limit: number }) {
    const res = await this.companyAdminService.getCompaniesAdmin(value);
    return {
      value: res,
      key: Date.now(),
    };
  }
}
