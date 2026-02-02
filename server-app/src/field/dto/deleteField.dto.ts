import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class DeleteFieldDto {
  @IsNotEmpty()
  @IsObject()
  readonly requestData: { field_id: Types.ObjectId };

  @IsNotEmpty()
  @IsString()
  readonly requestName: string;
}
