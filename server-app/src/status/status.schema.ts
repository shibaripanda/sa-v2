import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StatusDocument = Status & Document;

@Schema({ timestamps: true })
export class Status {
  @Prop({ required: true })
  company_owner_id: string;

  @Prop({ required: true, default: 'New Status' })
  name: string;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
