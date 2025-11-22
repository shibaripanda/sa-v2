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

  async deleteManyStaffUsers(ids: Types.ObjectId[], session?: ClientSession) {
    await this.staffUserModel.deleteMany({ _id: { $in: ids } }, { session });
  }

  async getMyStaffUsers_ids(origin_user_id: Types.ObjectId) {
    const res = await this.staffUserModel.find({ origin_user_id }, { _id: 1 });
    return res.map((u) => u._id);
  }

  async createNewStaffUser(
    origin_user_id: Types.ObjectId,
    role_id: Types.ObjectId,
    service_id: Types.ObjectId,
    session?: ClientSession,
  ): Promise<Types.ObjectId> {
    const res = await this.staffUserModel.create(
      [
        {
          origin_user_id,
          userStaffServices: [service_id],
          role_ids: [role_id],
        },
      ],
      { session },
    );
    return res[0]._id;
  }
}
