import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import OpenAI from 'openai';
import { Order, OrderDocument } from './order.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderService implements OnModuleInit {
  private readonly clientAI: OpenAI;
  public textLib: Text[] = [];

  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private readonly configService: ConfigService,
  ) {
    this.clientAI = new OpenAI({
      apiKey: this.configService.get<string>('OPEN_AI_TOKEN'),
    });
  }

  async onModuleInit() {}
}
