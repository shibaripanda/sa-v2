import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class DeleteStatusDto {
  @IsNotEmpty()
  @IsObject()
  readonly requestData: { status_id: Types.ObjectId };

  @IsNotEmpty()
  @IsString()
  readonly requestName: string;
}
