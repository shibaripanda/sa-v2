import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';
import { Part, PartDocument } from './part.schema';

@Injectable()
export class PartService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
    @InjectModel(Part.name) private partModel: Model<PartDocument>,
  ) {}

  async deleteManyParts(ids: Types.ObjectId[], session?: ClientSession) {
    await this.partModel.deleteMany({ _id: { $in: ids } }, { session });
  }

  async createNewPart(
    shop_owner_id: Types.ObjectId,
    service_owner_id: Types.ObjectId,
    session?: ClientSession,
  ): Promise<Types.ObjectId> {
    const res = await this.partModel.create(
      [
        {
          shop_owner_id,
          service_owner_id,
        },
      ],
      {
        session,
      },
    );
    return res[0]._id;
  }

  // async createNewPart(
  //   shop_owner_id: Types.ObjectId,
  //   service_owner_id: Types.ObjectId,
  // ) {
  //   const res = await this.partModel.create({
  //     shop_owner_id,
  //     service_owner_id,
  //   });
  //   return res._id;
  // }
}
