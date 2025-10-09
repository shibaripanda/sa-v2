import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Service, ServiceDocument } from './service.schema';
import { Model } from 'mongoose';

@Injectable()
export class ServiceService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
  ) {}

  async createNewService(company_owner_id: string) {
    return await this.serviceModel.create({
      company_owner_id: company_owner_id,
    });
  }
}
