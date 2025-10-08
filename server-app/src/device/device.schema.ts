import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeviceDocument = Device & Document;

@Schema({ timestamps: true })
export class Device {
  @Prop({ required: true })
  company_owner_id: string;

  @Prop({ required: true, default: 'New Device' })
  name: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
