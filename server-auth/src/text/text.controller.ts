import { Body, Controller, Post } from '@nestjs/common';
import { TextService } from './text.service';

@Controller('text')
export class TextController {
  constructor(private textService: TextService) {}

  @Post('/textavailable')
  getTextAvailable() {
    return this.textService.getTextAvailable();
  }

  @Post('/textlib')
  getTextLib(@Body() data: { leng: string }) {
    console.log(data);
    return this.textService.getTextLib(data.leng);
  }
}
