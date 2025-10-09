import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true, default: 'New Role' })
  name: string;

  @Prop({ required: true, default: [] })
  actions: string[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Device' }],
    required: true,
    default: [],
  })
  devices_ids: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Status' }],
    required: true,
    default: [],
  })
  statuses_ids: Types.ObjectId[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
