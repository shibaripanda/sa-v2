import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type StatusDocument = HydratedDocument<Status>;

@Schema({ timestamps: true })
export class Status {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  company_owner_id: string;

  @Prop({ required: true, default: 'New Status' })
  name: string;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
