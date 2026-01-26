import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class DeleteStatusDto {
  @IsNotEmpty()
  @IsObject()
  readonly requestData: { device_id: Types.ObjectId };

  @IsNotEmpty()
  @IsString()
  readonly requestName: string;
}
