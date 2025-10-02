import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TelegramLoginDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly first_name: string;

  readonly username: string;
  readonly photo_url: string;
  readonly auth_date: number;
  readonly hash: string;
}
