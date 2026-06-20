import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class GetUsersAdminDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly page!: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(100)
  readonly limit!: number;
}
