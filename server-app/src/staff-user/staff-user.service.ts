import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  async createNewStaffUser(origin_user_id: string, role_id: Types.ObjectId) {
    const res = await this.staffUserModel.create({
      origin_user_id,
      $push: { role_ids: role_id },
    });
    return res._id;
  }
}
