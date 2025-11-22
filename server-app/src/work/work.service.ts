import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Work, WorkDocument } from './work.schema';
import { ClientSession, Model, Types } from 'mongoose';

@Injectable()
export class WorkService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
    @InjectModel(Work.name) private workModel: Model<WorkDocument>,
  ) {}

  async deleteManyWorks(ids: Types.ObjectId[], session?: ClientSession) {
    await this.workModel.deleteMany({ _id: { $in: ids } }, { session });
  }

  async createNewWork(session?: ClientSession): Promise<Types.ObjectId> {
    const res = await this.workModel.create([{}], { session });
    return res[0]._id;
  }

  // async createNewWork() {
  //   const res = await this.workModel.create({});
  //   return res._id;
  // }
}
