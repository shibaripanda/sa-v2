import { IsNotEmpty, IsString } from 'class-validator';

export class TelegramLoginDto {
  @IsNotEmpty()
  @IsString()
  readonly access_token: string;
}
