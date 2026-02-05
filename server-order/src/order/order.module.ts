import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderKafkaController } from './order.kafka.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
  ],
  providers: [OrderService],
  controllers: [OrderKafkaController],
})
export class OrderModule {}
