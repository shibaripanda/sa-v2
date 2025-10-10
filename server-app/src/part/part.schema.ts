import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PartDocument = HydratedDocument<Part>;

@Schema({ timestamps: true })
export class Part {
  @Prop({
    type: Types.ObjectId,
    ref: 'Service',
    autopopulate: true,
  })
  service_owner_id: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Device',
    autopopulate: true,
  })
  shop_owner_id: Types.ObjectId;

  @Prop({ required: true, default: 'New Part' })
  name: string;

  @Prop({ required: true, default: 1 })
  count: number;

  @Prop({ required: true, default: 10 })
  buyPrice: number;

  @Prop({ required: true, default: 15 })
  sellPrice: number;
}

export const PartSchema = SchemaFactory.createForClass(Part);
