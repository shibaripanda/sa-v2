import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderGateway } from './order.gateway';

@Module({
  controllers: [OrderController],
  providers: [OrderGateway],
})
export class OrderModule {}
