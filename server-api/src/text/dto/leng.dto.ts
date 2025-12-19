import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LengDto {
  @IsNotEmpty()
  @IsString()
  @Length(2)
  readonly leng: string;
}
