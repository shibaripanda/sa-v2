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

  @MessagePattern('editOrderStatus_order')
  async editOrderStatus(@Payload() newStatus: { _id: string; newStatusId: string }) {
    const res = await this.orderService.editOrderStatus(newStatus);
    return {
      value: res,
      key: 'editOrderStatus_order',
    };
  }

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
    const res = await this.orderService.getOrders(query);
    return {
      value: { orders: res },
      key: 'getOrders_order',
    };
  }
}
