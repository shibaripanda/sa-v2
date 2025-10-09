import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { Company, CompanyDocument } from './company.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async createNewCompany(
    user_owner_id: string,
    device_id: Types.ObjectId,
    status_id: Types.ObjectId,
    work_id: Types.ObjectId,
    service_id: Types.ObjectId,
    part_id: Types.ObjectId,
  ) {
    return await this.companyModel.create({
      user_owner_id,
      devices_ids: [device_id],
      statuses_ids: [status_id],
      works_ids: [work_id],
      services_ids: [service_id],
      parts_ids: [part_id],
    });
  }
}
