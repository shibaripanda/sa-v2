import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type ShopDocument = HydratedDocument<Shop>;

@Schema({ timestamps: true })
export class Shop {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  company_owner_id: string;

  @Prop({ required: true, default: 'New Shop' })
  name: string;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
