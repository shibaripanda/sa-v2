import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { KafkaService } from 'src/app/kafka.service';
// import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UniversalJwtGuard } from 'src/guards/universalJwtGuard';
import { EditStatusDto } from './dto/status/editStatus.dto';
import { DeleteStatusDto } from './dto/status/deleteStatus.dto';

@Controller('device')
export class DeviceController {
  constructor(private readonly kafkaService: KafkaService) {}

  @UseGuards(UniversalJwtGuard)
  @Post('/edit-device')
  async editDevice(
    @Body()
    data: EditStatusDto,
    // @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    const res = await this.kafkaService.sendAnyReq('edit-device', data);
    return res;
  }

  @UseGuards(UniversalJwtGuard)
  @Post('/delete-device')
  async deleteDevice(
    @Body()
    data: DeleteStatusDto,
    // @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    console.log('/delete-device');
    const res = await this.kafkaService.sendAnyReq('delete-device', data);
    console.log(res, data);
    return typeof res === 'object' ? res.status : res;
  }
}
