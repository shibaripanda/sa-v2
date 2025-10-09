import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Service, ServiceDocument } from './service.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ServiceService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
  ) {}

  async createNewService(staffUser_id: Types.ObjectId) {
    const res = await this.serviceModel.create({
      users_staff_ids: [staffUser_id],
    });
    return res._id;
  }
}
