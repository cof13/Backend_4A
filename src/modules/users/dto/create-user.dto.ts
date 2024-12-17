// create-user.dto.ts
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  mail: string;

  @MinLength(6)
  @MaxLength(25)
  @IsNotEmpty()
  password: string;
}
