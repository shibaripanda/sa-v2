import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './order.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { GetOrders } from './order.kafka.controller';

@Injectable()
export class OrderService {
  public textLib: Text[] = [];

  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private readonly configService: ConfigService,
  ) {}

  async createOrder(order: object) {
    const res = await this.orderModel.create(order);
    return res;
  }

  async getOrders(query: GetOrders) {
    const { page, limit, compId, serviceId } = query;

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.orderModel.find({ compId, serviceId }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),

      this.orderModel.countDocuments(),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
