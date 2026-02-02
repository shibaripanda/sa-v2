import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FieldDocument = HydratedDocument<Field>;

@Schema({ timestamps: true })
export class Field {
  @Prop({ required: true, default: 'New Field' })
  name: string;

  @Prop({ required: true, default: false })
  onlyNumber: boolean;

  @Prop({ required: true, default: true })
  mustHave: boolean;

  @Prop({ required: true, default: true })
  variants: boolean;

  @Prop({ required: true, default: [] })
  data: [string | number];
}

export const FieldSchema = SchemaFactory.createForClass(Field);
