import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CompanyService } from './company.service';
import { UpdateCompanyStatusLine } from './dto/updateCompanyStatusLine.dto';
import { UpdateCompanyDataDto } from './dto/updateCompanyData.dto';
import { UpdateCompanyDeviceLine } from './dto/updateCompanyDeviceLine.dto';
import { UpdateCompanyFieldLine } from './dto/updateCompanyFieldLine.dto';

@Controller()
export class CompanyKafkaController {
  constructor(private companyService: CompanyService) {}

  @MessagePattern('update-device-line')
  async updateDeviceLine(@Payload() data: UpdateCompanyDeviceLine) {
    const res = await this.companyService.updateCompanyData(
      data._id,
      data.requestData,
    );
    return {
      value: res,
      key: Date.now(),
    };
  }

  @MessagePattern('update-field-line')
  async updateFieldLine(@Payload() data: UpdateCompanyFieldLine) {
    const res = await this.companyService.updateCompanyData(
      data._id,
      data.requestData,
    );
    return {
      value: res,
      key: Date.now(),
    };
  }

  @MessagePattern('update-status-line')
  async updateStatusLine(@Payload() data: UpdateCompanyStatusLine) {
    const res = await this.companyService.updateCompanyData(
      data._id,
      data.requestData,
    );
    return {
      value: res,
      key: Date.now(),
    };
  }

  @MessagePattern('update-company')
  async updateCompanyData(@Payload() data: UpdateCompanyDataDto) {
    const res = await this.companyService.updateCompanyData(
      data._id,
      data.requestData,
    );
    return {
      value: res,
      key: Date.now(),
    };
  }
}
