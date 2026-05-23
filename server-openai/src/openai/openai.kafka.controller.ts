import { Body, Controller } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class OpenAIKafkaController {
  constructor(private openaiService: OpenAIService) {}

  // @MessagePattern('textavailable')
  // getTextAvailable() {
  //   const res = { res: 'res' };
  //   return {
  //     value: res,
  //     key: 'textavailable',
  //   };
  // }

  @MessagePattern('create-order')
  createOrder(@Payload() newOrder: object) {
    console.log(newOrder);
    // const res = { res: true };
    return {
      value: true,
      key: 'create-order',
    };
  }
}
