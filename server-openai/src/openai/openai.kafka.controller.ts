import { Body, Controller } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class OpenAIKafkaController {
  constructor(private openaiService: OpenAIService) {}

  @MessagePattern('analyzPhotos_openai')
  async analyz(
    @Payload()
    newOrder: {
      photos: string[];
      fields: string[];
      device: string;
      leng: string;
    },
  ) {
    console.log(newOrder);
    const res = await this.openaiService.analyz(newOrder.photos, newOrder.fields, newOrder.device, newOrder.leng);
    console.log(res);
    return {
      value: { analyzData: res },
      key: 'analyzPhotos_openai',
    };
  }
}
