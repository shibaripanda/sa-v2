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

  async createNewStatus(session?: ClientSession): Promise<Types.ObjectId> {
    const res = await this.statusModel.create([{ freez: true }], { session });
    return res[0]._id;
  }

  // async createNewStatus() {
  //   const res = await this.statusModel.create({ freez: true });
  //   return res._id;
  // }
}
