import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Service, ServiceDocument } from './service.schema';
import { ClientSession, Model, Types } from 'mongoose';

@Injectable()
export class ServiceService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
  ) {}

  // async getServiceWhereAamStaff(users_staff_id: Types.ObjectId) {
  //   return await this.serviceModel.find({
  //     users_staff_ids: { $in: [users_staff_id] },
  //   });
  // }

  async createNewService(session?: ClientSession): Promise<Types.ObjectId> {
    const res = await this.serviceModel.create([{}], { session });
    return res[0]._id;
  }
}
