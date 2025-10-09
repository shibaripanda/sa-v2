import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type DeviceDocument = HydratedDocument<Device>;

@Schema({ timestamps: true })
export class Device {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  company_owner_id: string;

  @Prop({ required: true, default: 'New Device' })
  name: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
