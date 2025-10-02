import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GoogleLoginDto {
  @IsNotEmpty()
  @IsString()
  readonly access_token: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;
}
