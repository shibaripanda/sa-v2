import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type PartDocument = HydratedDocument<Part>;

@Schema({ timestamps: true })
export class Part {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  company_owner_id: string;

  @Prop({ required: true })
  service_owner_id: string;

  @Prop({ required: true })
  shop_owner_id: string;

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
