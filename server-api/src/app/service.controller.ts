import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { KafkaService } from 'src/app/kafka.service';
import { UniversalJwtGuard } from 'src/guards/universalJwtGuard';
import { UpdateCompanyDataDto } from './dto/comp/updateCompanyData.dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly kafkaService: KafkaService) {}

  @UseGuards(UniversalJwtGuard)
  @Post('/update-service')
  async deleteStatus(
    @Body()
    data: UpdateCompanyDataDto,
    // @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    const res = await this.kafkaService.sendAnyReq('update-service', data);
    return res;
  }
}
