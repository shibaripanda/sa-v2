import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AddNewStatusDto {
  @IsNotEmpty()
  @IsObject()
  readonly requestData: { company_id: Types.ObjectId };

  @IsNotEmpty()
  @IsString()
  readonly requestName: string;
}
