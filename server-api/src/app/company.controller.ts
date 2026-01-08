import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { KafkaService } from 'src/app/kafka.service';
// import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UniversalJwtGuard } from 'src/guards/universalJwtGuard';
import { UpdateCompanyDataDto } from './dto/comp/updateCompanyData.dto';
import { UpdateCompanyStatusLine } from './dto/comp/updateCompanyStatusLine.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly kafkaService: KafkaService) {}

  @UseGuards(UniversalJwtGuard)
  @Post('/update-status-line')
  async editStatus(
    @Body()
    data: UpdateCompanyStatusLine,
    // @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    const res = await this.kafkaService.sendAnyReq('update-status-line', data);
    return res;
  }

  @UseGuards(UniversalJwtGuard)
  @Post('/update-company')
  async deleteStatus(
    @Body()
    data: UpdateCompanyDataDto,
    // @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    const res = await this.kafkaService.sendAnyReq('update-company', data);
    return res;
  }
}
