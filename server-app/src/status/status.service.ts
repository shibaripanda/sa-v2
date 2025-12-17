import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';
import { Status, StatusDocument } from './status.schema';

@Injectable()
export class StatusService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
    @InjectModel(Status.name) private statusModel: Model<StatusDocument>,
  ) {}

  async editStatus(status_id: Types.ObjectId, data: { [key: string]: string }) {
    return await this.statusModel.findOneAndUpdate({ _id: status_id }, data, {
      returnDocument: 'after',
    });
  }

  async deleteStatus(status_id: Types.ObjectId) {
    return await this.statusModel.deleteOne({ _id: status_id });
  }

  async deleteManyStatuses(ids: Types.ObjectId[], session?: ClientSession) {
    await this.statusModel.deleteMany({ _id: { $in: ids } }, { session });
  }

  async createNewOpenStatus(session?: ClientSession): Promise<Types.ObjectId> {
    const res = await this.statusModel.create([{ freez: false }], { session });
    return res[0]._id;
  }

  async createNewStatus(session?: ClientSession): Promise<Types.ObjectId[]> {
    const stats = [
      { name: '1', color: 1 },
      { name: '2', color: 50 },
      { name: '3', color: 100 },
      { name: '4', color: 150 },
      { name: '5', color: 250 },
    ];
    const res = await this.statusModel.create(stats, {
      session,
      ordered: true,
    });
    return res.map((s) => s._id);
  }

  // async createNewStatus() {
  //   const res = await this.statusModel.create({ freez: true });
  //   return res._id;
  // }
}
