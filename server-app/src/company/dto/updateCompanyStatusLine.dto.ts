import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateCompanyStatusLine {
  @IsNotEmpty()
  @IsObject()
  readonly requestData: { statuses_ids: Types.ObjectId[] };

  @IsNotEmpty()
  @IsString()
  readonly requestName: string;

  @IsNotEmpty()
  @IsString()
  readonly _id: Types.ObjectId;
}
