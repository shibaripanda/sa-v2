import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { myLengs, myLib } from './text.libs';

export interface LengIndexes {
  title: string;
  index: string;
  info: string;
}

export interface LengInstruction {
  rutext: string;
  index: string;
  update: boolean;
}

export const lengs: LengIndexes[] = myLengs;

export const textArray: LengInstruction[] = myLib;

export type TextDocument = Text & Document;

@Schema()
export class Text {
  @Prop({ required: true })
  rutext: string;

  @Prop({ required: true, unique: true })
  index: string;
}

const baseSchema = SchemaFactory.createForClass(Text);
const dynamicFields = lengs.map((lang) => lang.index);

dynamicFields.forEach((lang) => {
  baseSchema.add({ [lang]: String });
});

export const TextSchema = baseSchema;
