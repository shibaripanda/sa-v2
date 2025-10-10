import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true })
  user_owner_id: string;

  @Prop({ required: true, default: 'New Company' })
  name: string;

  @Prop({
    required: true,
    default:
      'My Company, Luna, Krater st. 17, tax number: 11111111, SunBank, account: 987654321 - example',
  })
  mainOfficeData: string;

  @Prop({
    required: true,
    default: '+1 111 123456789, mycompanyemail@em.com - example',
  })
  mainOfficeContacts: string;

  @Prop({ required: true, default: 50 })
  defaultProfitPartProcent: number;

  @Prop({ required: true, default: 20 })
  defaulTaxProcent: number;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Service', autopopulate: true }],
    required: true,
    default: [],
  })
  services_ids: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Role', autopopulate: true }],
    required: true,
    default: [],
  })
  roles_ids: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Status', autopopulate: true }],
    required: true,
    default: [],
  })
  statuses_ids: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Device', autopopulate: true }],
    required: true,
    default: [],
  })
  devices_ids: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Part', autopopulate: true }],
    required: true,
    default: [],
  })
  parts_ids: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Work', autopopulate: true }],
    required: true,
    default: [],
  })
  works_ids: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Shop', autopopulate: true }],
    required: true,
    default: [],
  })
  shops_ids: Types.ObjectId[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
