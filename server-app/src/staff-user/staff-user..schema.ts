import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

type ProfitMode = 'fullProcent' | 'procentWork' | 'fix';

export type StaffUserDocument = HydratedDocument<StaffUser>;

@Schema({ timestamps: true })
export class StaffUser {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  company_owner_id: string;

  @Prop({ required: true })
  origin_user_id: string;

  @Prop({ required: true, default: [] })
  service_owner_ids: string[];

  @Prop({ required: true, default: [] })
  role_ids: string[];

  @Prop({ required: true, default: 'procentWork' })
  profitMode: ProfitMode;

  @Prop({ required: true, default: 25 })
  profit: number;

  @Prop({ required: true, default: [] })
  filterStatuses: string[];

  @Prop({ required: true, default: [] })
  filterDevices: string[];

  @Prop()
  startTime: number;

  @Prop()
  endTime: number;
}

export const StaffUserSchema = SchemaFactory.createForClass(StaffUser);
