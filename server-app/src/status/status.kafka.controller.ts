import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StatusService } from './status.service';
import { EditStatusDto } from './dto/editStatus.dto';
import { DeleteStatusDto } from './dto/deleteStatus.dto';

@Controller()
export class StatusKafkaController {
  constructor(private readonly statusService: StatusService) {}

  @MessagePattern('edit-status')
  async editStatus(@Payload() data: EditStatusDto) {
    const res = await this.statusService.editStatus(
      data.requestData.status_id,
      data.requestData.data,
    );
    return {
      value: res,
      key: Date.now(),
    };
  }

  @MessagePattern('delete-status')
  async deleteStatus(@Payload() data: DeleteStatusDto) {
    const res = await this.statusService.deleteStatus(
      data.requestData.status_id,
    );
    return {
      value: res,
      key: Date.now(),
    };
  }
}
