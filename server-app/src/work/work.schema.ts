import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type WorkDocument = HydratedDocument<Work>;

@Schema({ timestamps: true })
export class Work {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  company_owner_id: string;

  @Prop({ required: true, default: 'Software setup' })
  name: string;

  @Prop({ required: true, default: 10 })
  buyPrice: number;

  @Prop({ required: true, default: 15 })
  sellPrice: number;
}

export const WorkSchema = SchemaFactory.createForClass(Work);
