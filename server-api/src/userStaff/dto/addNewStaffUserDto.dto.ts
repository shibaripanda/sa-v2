import { IsEmail, IsMongoId, IsString, ValidateIf } from 'class-validator';

export class AddNewStaffUserDto {
  @ValidateIf((o) => !o.username)
  @IsEmail()
  readonly email?: string;

  @ValidateIf((o) => !o.email)
  @IsString()
  readonly username?: string;

  @IsMongoId()
  readonly company_id!: string;

  @IsMongoId()
  readonly service_id!: string;
}
