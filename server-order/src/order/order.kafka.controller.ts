import { Body, Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Order } from './order.schema';

export interface GetOrders {
  page: number;
  limit: number;
  compId: string;
  serviceId: string;
}

@Controller()
export class OrderKafkaController {
  constructor(private orderService: OrderService) {}

  @MessagePattern('createOrder_order')
  async createOrder(@Payload() newOrder: Order) {
    const res = await this.orderService.createOrder(newOrder);
    return {
      value: res,
      key: 'createOrder_order',
    };
  }

  @MessagePattern('getOrders_order')
  async getOrders(@Payload() query: GetOrders) {
    console.log(query);
    const res = await this.orderService.getOrders(query);
    console.log(res);
    return {
      value: { orders: res },
      key: 'getOrders_order',
    };
  }
}
