import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class EditDeviceDto {
  @IsNotEmpty()
  @IsObject()
  readonly requestData: {
    device_id: Types.ObjectId;
    data: { [key: string]: string };
  };

  @IsNotEmpty()
  @IsString()
  readonly requestName: string;
}
