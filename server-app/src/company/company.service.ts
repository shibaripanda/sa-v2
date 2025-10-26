import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { Company, CompanyDocument } from './company.schema';
import { ClientSession, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async getCompanyesWhereStaff(
    user_staff_ids: Types.ObjectId[],
    comp_ids: Types.ObjectId[],
    user_id: string,
  ) {
    const res = await this.companyModel.find({
      staff_users_ids: { $in: user_staff_ids },
      _id: { $nin: comp_ids },
    });
    // const res = await this.companyModel.find({ user_owner_id: user_id });
    if (!res.length) return [];
    for (const c of res) {
      c.staff_users_ids = c.staff_users_ids.filter(
        (us) => us.origin_user_id === user_id,
      );
      c.services_ids = c.services_ids.filter(
        (ser) => !c.staff_users_ids[0].userStaffServices.includes(ser._id),
      );
    }
    return res;
  }

  async getMyStaffUsers(origin_user_id: string) {
    return await this.companyModel.find({ origin_user_id });
  }

  async getCompanyWhereOwner(user_owner_id: string) {
    return await this.companyModel.find({ user_owner_id });
  }

  async getCompanyWithRelations(companyId: Types.ObjectId) {
    return await this.companyModel.findById(companyId);
  }

  async createNewCompany(
    user_owner_id: string,
    staffUser_id: Types.ObjectId,
    shop_id: Types.ObjectId,
    role_id: Types.ObjectId,
    device_id: Types.ObjectId,
    status_id: Types.ObjectId,
    work_id: Types.ObjectId,
    service_id: Types.ObjectId,
    part_id: Types.ObjectId,
    session?: ClientSession,
  ): Promise<CompanyDocument> {
    const company = await this.companyModel.create(
      [
        {
          user_owner_id,
          staff_users_ids: [staffUser_id],
          shops_ids: [shop_id],
          roles_ids: [role_id],
          devices_ids: [device_id],
          statuses_ids: [status_id],
          works_ids: [work_id],
          services_ids: [service_id],
          parts_ids: [part_id],
        },
      ],
      { session },
    );
    return company[0];
  }
}
