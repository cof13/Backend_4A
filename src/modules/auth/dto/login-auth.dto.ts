import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  @IsNotEmpty()
  mail: string;

  @MinLength(6)
  @MaxLength(25)
  @IsNotEmpty()
  password: string;
}
