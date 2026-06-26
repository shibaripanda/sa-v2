import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';
import { StaffUser, StaffUserDocument } from './staff-user.schema';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class StaffUserService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
    @InjectModel(StaffUser.name)
    private staffUserModel: Model<StaffUserDocument>,
  ) {}

  async getStaffUserById(_id: Types.ObjectId) {
    return await this.staffUserModel.findById(_id);
  }

  async deleteManyStaffUsers(ids: Types.ObjectId[], session?: ClientSession) {
    await this.staffUserModel.deleteMany({ _id: { $in: ids } }, { session });
  }

  async isLegalStaff(user_id: Types.ObjectId, staffUser_id: Types.ObjectId) {
    const res = await this.staffUserModel.findOne({ _id: staffUser_id, origin_user_id: user_id });
    return res;
  }

  async getMyStaffUsers_ids(origin_user_id: Types.ObjectId) {
    const res = await this.staffUserModel.find({ origin_user_id }, { _id: 1 });
    return res.map((u) => u._id);
  }

  async createNewStaffUser(
    origin_user_id: Types.ObjectId,
    role_id: Types.ObjectId,
    service_id: Types.ObjectId,
    field_id_arr: Types.ObjectId[],
    session?: ClientSession,
  ): Promise<Types.ObjectId> {
    const res = await this.staffUserModel.create(
      [
        {
          origin_user_id,
          userStaffServices: [service_id],
          userStaffFieldsLine: field_id_arr,
          role_ids: [role_id],
        },
      ],
      { session },
    );
    return res[0]._id;
  }
}
