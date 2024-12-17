// register-auth.dto.ts
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @IsEmail()
  @IsNotEmpty()
  mail: string;
  @IsNotEmpty()
  name: string;

  @MinLength(6)
  @MaxLength(25)
  @IsNotEmpty()
  password: string;
}
