import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EditStatusDto } from './dto/editStatus.dto';
import { DeleteStatusDto } from './dto/deleteStatus.dto';
import { DeviceService } from './device.service';

@Controller()
export class DeviceKafkaController {
  constructor(private readonly deviceService: DeviceService) {}

  @MessagePattern('edit-device')
  async editStatus(@Payload() data: EditStatusDto) {
    const res = await this.deviceService.editDevice(
      data.requestData.status_id,
      data.requestData.data,
    );
    return {
      value: res,
      key: Date.now(),
    };
  }

  @MessagePattern('delete-device')
  async deleteStatus(@Payload() data: DeleteStatusDto) {
    console.log(data);
    const res = await this.deviceService.deleteDevice(
      data.requestData.device_id,
    );
    return {
      value: { status: res.deletedCount },
      key: Date.now(),
    };
  }
}
