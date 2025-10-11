import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true, default: 'New Role' })
  name: string;

  @Prop({ required: true, default: [] })
  actions: string[];

  // @Prop({
  //   type: [{ type: Types.ObjectId, ref: 'Servicr', autopopulate: true }],
  //   required: true,
  //   default: [],
  // })
  // services_ids: Types.ObjectId[];

  // @Prop({
  //   type: [{ type: Types.ObjectId, ref: 'Device', autopopulate: true }],
  //   required: true,
  //   default: [],
  // })
  // devices_ids: Types.ObjectId[];

  // @Prop({
  //   type: [{ type: Types.ObjectId, ref: 'Status', autopopulate: true }],
  //   required: true,
  //   default: [],
  // })
  // statuses_ids: Types.ObjectId[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
