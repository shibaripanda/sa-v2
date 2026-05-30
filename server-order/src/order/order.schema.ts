import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({
  timestamps: true,
  strict: false, // оставил, но в идеале можно будет убрать позже
})
export class Order {
  @Prop({ required: true })
  order_id!: string;

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
  compId!: string;

  @Prop({ required: true })
  serviceId!: string;

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
