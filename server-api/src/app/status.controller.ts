import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { KafkaService } from 'src/app/kafka.service';
// import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UniversalJwtGuard } from 'src/guards/universalJwtGuard';
import { EditStatusDto } from './dto/status/editStatus.dto';
import { DeleteStatusDto } from './dto/status/deleteStatus.dto';

@Controller('status')
export class StatusController {
  constructor(private readonly kafkaService: KafkaService) {}

  @UseGuards(UniversalJwtGuard)
  @Post('/edit-status')
  async editStatus(
    @Body()
    data: EditStatusDto,
    // @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    const res = await this.kafkaService.sendAnyReq('edit-status', data);
    return res;
  }

  @UseGuards(UniversalJwtGuard)
  @Post('/delete-status')
  async deleteStatus(
    @Body()
    data: DeleteStatusDto,
    // @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    console.log('/delete-status');
    const res = await this.kafkaService.sendAnyReq('delete-status', data);
    console.log(res);
    return res;
  }
}
