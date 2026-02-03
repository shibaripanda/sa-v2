import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ServiceService } from './service.service';
import { UpdateCompanyDataDto } from 'src/company/dto/updateCompanyData.dto';

@Controller()
export class ServiceKafkaController {
  constructor(private serviceService: ServiceService) {}

  @MessagePattern('update-service')
  async updateServiceData(@Payload() data: UpdateCompanyDataDto) {
    const res = await this.serviceService.updateServiceData(
      data._id,
      data.requestData,
    );
    return {
      value: res,
      key: Date.now(),
    };
  }
}
