import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  company_owner_id: string;

  @Prop({ required: true, default: 'New Role' })
  name: string;

  @Prop({ required: true, default: [] })
  actions: string[];

  @Prop({ required: true, default: [] })
  devices_ids: string[];

  @Prop({ required: true, default: [] })
  statuses_ids: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
