import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './order.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { GetOrders } from './order.kafka.controller';
import { getErrorMessage } from 'src/utils/Errors';

@Injectable()
export class OrderService {
  public textLib: Text[] = [];

  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private readonly configService: ConfigService,
  ) {}

  private readonly letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  async editOrderStatus(newStatus: { _id: string; newStatusId: string }) {
    try {
      await this.orderModel.findByIdAndUpdate(newStatus._id, { statusId: newStatus.newStatusId }, { new: true });
      return { status: true };
    } catch (e) {
      console.error('Mongo editOrderStatus error:', e);
      return { status: false, error: getErrorMessage(e) };
    }
  }

  async createOrder(order: Order) {
    try {
      const order_id = await this.generateUniqueOrder_id(order.compId);
      const res = await this.orderModel.create({ ...order, order_id });
      return { status: true, order: res };
    } catch (e) {
      console.error('Mongo createOrder error:', e);
      return { status: false, error: getErrorMessage(e) };
    }
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

  async generateUniqueOrder_id(compId: string): Promise<string> {
    let id = this.generate();
    while (await this.orderModel.exists({ orderId: id, compId })) {
      id = this.generate();
    }
    return id;
  }

  generate(): string {
    let prefix = '';

    for (let i = 0; i < 3; i++) {
      prefix += this.letters[Math.floor(Math.random() * this.letters.length)];
    }

    const numbers = Math.floor(1000 + Math.random() * 9000);

    return `${numbers}_${prefix}`;
  }
}
