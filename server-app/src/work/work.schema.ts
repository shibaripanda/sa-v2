import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkDocument = Work & Document;

@Schema({ timestamps: true })
export class Work {
  @Prop({ required: true })
  company_owner_id: string;

  @Prop({ required: true, default: 'New Work' })
  name: string;
}

export const WorkSchema = SchemaFactory.createForClass(Work);
