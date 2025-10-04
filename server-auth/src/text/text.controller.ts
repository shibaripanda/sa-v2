import { Body, Controller, Post } from '@nestjs/common';
import { TextService } from './text.service';

@Controller('text')
export class TextController {
  constructor(private textService: TextService) {}

  @Post('/textavailable')
  getTextAvailable() {
    return this.textService.getTextAvailable();
  }

  // @Post('/textlib')
  // async getTextLib(@Body() data: { leng: string }) {
  //   console.log(data);
  //   return await this.textService.getTextLib(data.leng);
  // }
}
