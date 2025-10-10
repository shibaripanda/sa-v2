import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeviceDocument = HydratedDocument<Device>;

@Schema({ timestamps: true })
export class Device {
  @Prop({ required: true, default: 'New Device' })
  name: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
