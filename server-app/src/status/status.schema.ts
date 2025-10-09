import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StatusDocument = HydratedDocument<Status>;

@Schema({ timestamps: true })
export class Status {
  @Prop({ required: true, default: 'New' })
  name: string;

  @Prop({ required: true, default: false })
  freez: boolean;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
