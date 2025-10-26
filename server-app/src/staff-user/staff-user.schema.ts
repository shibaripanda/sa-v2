import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

type ProfitMode = 'fullProcent' | 'procentWork' | 'fix';

export type StaffUserDocument = HydratedDocument<StaffUser>;

@Schema({ timestamps: true })
export class StaffUser {
  @Prop({ required: true })
  origin_user_id: string;

  @Prop({ required: true, default: 'procentWork' })
  profitMode: ProfitMode;

  @Prop({ required: true, default: 25 })
  profit: number;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Role', autopopulate: true }],
    required: true,
    default: [],
  })
  role_ids: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Service', autopopulate: true }],
    required: true,
    default: [],
  })
  userStaffServices: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Status', autopopulate: true }],
    required: true,
    default: [],
  })
  filterStatusesHiden: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Device', autopopulate: true }],
    required: true,
    default: [],
  })
  filterDevicesHiden: Types.ObjectId[];

  @Prop()
  startTime: number;

  @Prop()
  endTime: number;
}

export const StaffUserSchema = SchemaFactory.createForClass(StaffUser);
