import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WorkDocument = HydratedDocument<Work>;

@Schema({ timestamps: true })
export class Work {
  @Prop({ required: true, default: 'Software setup' })
  name: string;

  @Prop({ required: true, default: 10 })
  buyPrice: number;

  @Prop({ required: true, default: 15 })
  sellPrice: number;
}

export const WorkSchema = SchemaFactory.createForClass(Work);
