import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateCompanyDataDto {
  @IsNotEmpty()
  @IsObject()
  readonly requestData: { [key: string]: string };

  @IsNotEmpty()
  @IsString()
  readonly requestName: string;

  @IsNotEmpty()
  @IsString()
  readonly _id: Types.ObjectId;
}
