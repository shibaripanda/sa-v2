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

  async deleteService(_id: Types.ObjectId, session?: ClientSession) {
    await this.serviceModel.deleteOne({ _id }, { session });
  }

  async getService(_id: Types.ObjectId, session: ClientSession) {
    return await this.serviceModel.findById({ _id }).session(session);
  }

  async updateServiceData(_id: Types.ObjectId, data: object) {
    return await this.serviceModel.updateOne({ _id }, data);
  }

  async deleteManyServices(ids: Types.ObjectId[], session?: ClientSession) {
    await this.serviceModel.deleteMany({ _id: { $in: ids } }, { session });
  }

  async createNewService(session?: ClientSession): Promise<Types.ObjectId> {
    const res = await this.serviceModel.create([{}], { session });
    return res[0]._id;
  }
}
