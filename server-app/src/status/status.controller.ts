import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { StatusService } from './status.service';
import { UniversalJwtGuard } from 'src/app/guards/universalJwtGuard';
import { DeleteStatusDto } from './dto/deleteStatus.dto';
import { EditStatusDto } from './dto/editStatus.dto';

@Controller('status')
export class StatusController {
  constructor(private statusService: StatusService) {}

  @UseGuards(UniversalJwtGuard)
  @Post('/edit-status')
  async editStatus(
    @Body() data: EditStatusDto,
    // @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    console.log(data);
    return await this.statusService.editStatus(
      data.requestData.status_id,
      data.requestData.data,
    );
  }

  @UseGuards(UniversalJwtGuard)
  @Post('/delete-status')
  async deleteStatus(
    @Body() data: DeleteStatusDto,
    // @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    console.log(data);
    return await this.statusService.deleteStatus(data.requestData.status_id);
  }
}
