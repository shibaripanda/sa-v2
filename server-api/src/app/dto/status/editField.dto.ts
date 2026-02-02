import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class EditFieldDto {
  @IsNotEmpty()
  @IsObject()
  readonly requestData: {
    field_id: Types.ObjectId;
    data: { [key: string]: string };
  };

  @IsNotEmpty()
  @IsString()
  readonly requestName: string;
}
