import { Body, Controller } from '@nestjs/common';
import { TextService } from './text.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('text')
export class TextController {
  constructor(private textService: TextService) {}

  @MessagePattern('textavailable')
  getTextAvailable() {
    const res = this.textService.getTextAvailable();
    return {
      value: res,
      key: 'textavailable',
    };
  }

  @MessagePattern('textlib')
  getTextLib(@Payload() value: string) {
    const res = this.textService.getTextLib(value);
    return {
      value: res,
      key: 'textlib',
    };
  }
}
