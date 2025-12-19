import { Body, Controller, Post } from '@nestjs/common';
import { KafkaService } from 'src/app/kafka.service';
import { LengDto } from './dto/leng.dto';

@Controller('text')
export class TextController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post('/textavailable')
  async getTextAvailable() {
    return await this.kafkaService.sendAnyReq('textavailable', {});
  }

  @Post('/textlib')
  async getTextLib(@Body() data: LengDto) {
    return await this.kafkaService.sendAnyReq('textlib', data.leng);
  }
}
