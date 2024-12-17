import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
