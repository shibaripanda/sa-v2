import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({
  timestamps: true,
  strict: false,
})
export class Order {
  @Prop({ required: true, default: '-' })
  _deviceId_: string;

  @Prop({ required: true, default: '-' })
  _statusId_: string;

  @Prop({ required: true, default: '-' })
  _createrStaffId_: string;

  @Prop({ required: true, default: '-' })
  _createrOriginId_: string;

  @Prop({ required: true, default: '-' })
  _createrName_: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

// OrderSchema.index({ _device_Id_: 1 });
// OrderSchema.index({ _status_Id_: 1 });
// OrderSchema.index({ _createrStaff_Id_: 1 });
