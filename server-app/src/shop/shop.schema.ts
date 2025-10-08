import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShopDocument = Shop & Document;

@Schema({ timestamps: true })
export class Shop {
  @Prop({ required: true })
  company_owner_id: string;

  @Prop({ required: true, default: 'New Shop' })
  name: string;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
