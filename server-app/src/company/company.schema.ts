import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

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

  @Prop({ required: true, default: [] })
  services_ids: string[];

  @Prop({ required: true, default: [] })
  roles_ids: string[];

  @Prop({ required: true, default: [] })
  statuses_ids: string[];

  @Prop({ required: true, default: [] })
  devices_ids: string[];

  @Prop({ required: true, default: [] })
  parts_ids: string[];

  @Prop({ required: true, default: [] })
  works_ids: string[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
