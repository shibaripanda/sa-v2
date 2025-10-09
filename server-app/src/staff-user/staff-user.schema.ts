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
    type: [{ type: Types.ObjectId, ref: 'Role' }],
    required: true,
    default: [],
  })
  role_ids: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Status' }],
    required: true,
    default: [],
  })
  filterStatuses: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Device' }],
    required: true,
    default: [],
  })
  filterDevices: Types.ObjectId[];

  @Prop()
  startTime: number;

  @Prop()
  endTime: number;
}

export const StaffUserSchema = SchemaFactory.createForClass(StaffUser);
