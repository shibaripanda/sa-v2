import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class EditStatusDto {
  @IsNotEmpty()
  @IsObject()
  readonly requestData: {
    status_id: Types.ObjectId;
    data: { [key: string]: string };
  };

  @IsNotEmpty()
  @IsString()
  readonly requestName: string;
}
