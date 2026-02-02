import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { KafkaService } from 'src/app/kafka.service';
// import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UniversalJwtGuard } from 'src/guards/universalJwtGuard';
import { DeleteStatusDto } from './dto/status/deleteStatus.dto';
import { EditFieldDto } from './dto/status/editField.dto';

@Controller('field')
export class FieldController {
  constructor(private readonly kafkaService: KafkaService) {}

  @UseGuards(UniversalJwtGuard)
  @Post('/edit-field')
  async editDevice(
    @Body()
    data: EditFieldDto,
    // @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    const res = await this.kafkaService.sendAnyReq('edit-field', data);
    return res;
  }

  @UseGuards(UniversalJwtGuard)
  @Post('/delete-field')
  async deleteDevice(
    @Body()
    data: DeleteStatusDto,
    // @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    console.log('/delete-field');
    const res = await this.kafkaService.sendAnyReq('delete-field', data);
    console.log(res, data);
    return typeof res === 'object' ? res.status : res;
  }
}
