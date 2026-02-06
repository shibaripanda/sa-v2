import { Body, Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class OrderKafkaController {
  constructor(private orderService: OrderService) {}

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
