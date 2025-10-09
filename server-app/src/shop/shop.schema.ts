import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type ShopDocument = HydratedDocument<Shop>;

@Schema({ timestamps: true })
export class Shop {
  @Prop({ required: true, default: 'New Shop' })
  name: string;

  @Prop({ required: true, default: 'Shop with delivery' })
  info: string;

  @Prop({ required: true, default: '+23 82 828288383' })
  contacts: string;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
