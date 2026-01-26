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

  async getCompany(_id: Types.ObjectId, session: ClientSession) {
    return await this.companyModel.findById({ _id }).session(session);
  }

  async updateCompanyData(_id: Types.ObjectId, data: object) {
    return await this.companyModel.updateOne({ _id }, data);
  }

  async addDeviceToCompany(
    company_id: Types.ObjectId,
    device_id: Types.ObjectId,
    session: ClientSession,
  ) {
    return await this.companyModel
      .updateOne({ _id: company_id }, { $addToSet: { devices_ids: device_id } })
      .session(session);
  }

  async addStatusToCompany(
    company_id: Types.ObjectId,
    status_id: Types.ObjectId,
    session: ClientSession,
  ) {
    return await this.companyModel
      .updateOne(
        { _id: company_id },
        { $addToSet: { statuses_ids: status_id } },
      )
      .session(session);
  }

  async addServiceToCompany(
    company_id: Types.ObjectId,
    service_id: Types.ObjectId,
    session: ClientSession,
  ) {
    return await this.companyModel
      .updateOne(
        { _id: company_id },
        { $addToSet: { services_ids: service_id } },
      )
      .session(session);
  }

  async getCompanyesWhereStaff(
    user_staff_ids: Types.ObjectId[],
    comp_ids: Types.ObjectId[],
    user_id: Types.ObjectId,
  ) {
    const res = await this.companyModel.find({
      staff_users_ids: { $in: user_staff_ids },
      _id: { $nin: comp_ids },
    });
    // const res = await this.companyModel.find({ user_owner_id: user_id });
    if (!res.length) return [];
    for (const c of res) {
      c.staff_users_ids = c.staff_users_ids.filter(
        (us) => us.origin_user_id.toString() === user_id.toString(),
      );
      c.services_ids = c.services_ids.filter(
        (ser) => !c.staff_users_ids[0].userStaffServices.includes(ser._id),
      );
    }
    return res;
  }

  async getMyStaffUsers(origin_user_id: Types.ObjectId) {
    return await this.companyModel.find({ origin_user_id });
  }

  async getCompanyWhereOwner(user_owner_id: Types.ObjectId) {
    return await this.companyModel.find({ user_owner_id });
  }

  async getCompanyForDelete(
    user_owner_id: Types.ObjectId,
    session: ClientSession,
  ) {
    return await this.companyModel.find({ user_owner_id }).session(session);
  }

  async getCompanyWithRelations(companyId: Types.ObjectId) {
    return await this.companyModel.findById(companyId);
  }

  async deleteCompany(_id: Types.ObjectId, session?: ClientSession) {
    await this.companyModel.deleteOne({ _id }, { session });
  }

  async createNewCompany(
    user_owner_id: Types.ObjectId,
    staffUser_id: Types.ObjectId,
    shop_id: Types.ObjectId,
    role_id: Types.ObjectId,
    device_id: Types.ObjectId,
    status_id_arr: Types.ObjectId[],
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
          statuses_ids: status_id_arr,
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
