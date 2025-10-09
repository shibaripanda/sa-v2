import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

interface HistoryServiceLogin {
  date: number;
  ip: string;
  location: string;
  user_id: string;
}

export type ServiceDocument = HydratedDocument<Service>;

@Schema({ timestamps: true })
export class Service {
  @Prop({ required: true, default: 'New Service' })
  name: string;

  @Prop({ required: true, default: 'Saturn, Start st. 15' })
  address: string;

  @Prop({ required: true, default: '+3 424 22424242424' })
  contacts: string;

  @Prop({ required: true, default: '9:00 - 10:00, weekend: 8:00 - 10:00' })
  workTime: string;

  // @Prop({
  //   type: [{ type: Types.ObjectId, ref: 'Part' }],
  //   required: true,
  //   default: [],
  // })
  // parts_ids: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'StaffUser' }],
    required: true,
    default: [],
  })
  users_staff_ids: Types.ObjectId[];

  @Prop({ required: true, default: [] })
  historyServiceLogin: HistoryServiceLogin[];
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
