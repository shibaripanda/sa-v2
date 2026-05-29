import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({
  timestamps: true,
  strict: false, // оставил, но в идеале можно будет убрать позже
})
export class Order {
  @Prop({ required: true })
  deviceId!: string;

  @Prop({ required: true })
  statusId!: string;

  @Prop({ required: true })
  createrStaffId!: string;

  @Prop({ required: true })
  createrOriginId!: string;

  @Prop({ required: true })
  createrName!: string;

  @Prop({ required: true })
  photos!: string[];

  @Prop({
    type: Object,
    default: {},
  })
  data!: Record<string, any>;

  @Prop({
    type: Object,
    default: {},
  })
  snapshot!: Record<
    string,
    {
      label: string;
      type?: string;
      value?: any;
    }
  >;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { HydratedDocument } from 'mongoose';

// export type OrderDocument = HydratedDocument<Order>;

// @Schema({
//   timestamps: true,
//   strict: false,
// })
// export class Order {
//   @Prop({ required: true, default: '-' })
//   _deviceId_!: string;

//   @Prop({ required: true, default: '-' })
//   _statusId_!: string;

//   @Prop({ required: true, default: '-' })
//   _createrStaffId_!: string;

//   @Prop({ required: true, default: '-' })
//   _createrOriginId_!: string;

//   @Prop({ required: true, default: '-' })
//   _createrName_!: string;
// }

// export const OrderSchema = SchemaFactory.createForClass(Order);

// OrderSchema.index({ _device_Id_: 1 });
// OrderSchema.index({ _status_Id_: 1 });
// OrderSchema.index({ _createrStaff_Id_: 1 });
