import { Body, Controller, Post, Query } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService) {

    }
    @Post('register')
    async register(@Body() registerAuthDto: RegisterAuthDto) {
      return this.authService.register(registerAuthDto);
    }
    @Post('login')
    async login(@Body() loginAuthDto: LoginAuthDto) {
    return await this.authService.login(loginAuthDto);
  }
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
  

  
}
