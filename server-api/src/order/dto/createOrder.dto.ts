import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  readonly _deviceId_: string;

  @IsNotEmpty()
  @IsString()
  readonly _statusId_: string;

  @IsNotEmpty()
  @IsString()
  readonly _createrStaffId_: string;

  @IsNotEmpty()
  @IsString()
  readonly _createrOriginId_: string;

  @IsNotEmpty()
  @IsString()
  readonly _createrName_: string;
}

// _deviceId_: string;
// _statusId_: string;
// _createrStaffId_: string;
// _createrOriginId_: string;
// _createrName_: string;
