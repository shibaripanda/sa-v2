import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class UpdateUserDataDto {
  @IsNotEmpty()
  @IsObject()
  readonly requestData: { [key: string]: string };

  @IsNotEmpty()
  @IsString()
  readonly requestName: string;
}
