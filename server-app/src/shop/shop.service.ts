import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { Model } from 'mongoose';
import { Shop, ShopDocument } from './shop.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ShopService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
    @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
  ) {}

  async createNewShop(user_owner_id: string) {
    return await this.shopModel.create({ user_owner_id });
  }
}
