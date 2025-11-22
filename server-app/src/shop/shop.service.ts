import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { ClientSession, Model, Types } from 'mongoose';
import { Shop, ShopDocument } from './shop.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ShopService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
    @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
  ) {}

  async deleteManyShops(ids: Types.ObjectId[], session?: ClientSession) {
    await this.shopModel.deleteMany({ _id: { $in: ids } }, { session });
  }

  async createNewShop(session?: ClientSession): Promise<Types.ObjectId> {
    const res = await this.shopModel.create([{}], { session });
    return res[0]._id;
  }

  // async createNewShop() {
  //   const res = await this.shopModel.create({});
  //   return res._id;
  // }
}
