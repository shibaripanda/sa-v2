import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { Company, CompanyDocument } from './company.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CompanyAdminService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async getCompaniesAdmin(query: { page: number; limit: number }) {
    const { page, limit } = query;

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.companyModel
        .find()
        .populate('parts_ids')
        .populate('services_ids')
        .populate('roles_ids')
        .populate('statuses_ids')
        .populate('staff_users_ids')
        .populate('fields_ids')
        .populate('devices_ids')
        .populate('works_ids')
        .populate('shops_ids')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      this.companyModel.countDocuments(),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
