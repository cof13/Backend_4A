import { Body, Controller, Post } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}
    @Post('register')
    registerUser(@Body() userObj: RegisterAuthDto) {
        console.log(userObj);
        return this.authService.funRegister(userObj);
    }

    @Post('login')
    login(@Body() credenciales: LoginAuthDto & { rememberMe: boolean }) {
        return this.authService.login(credenciales, credenciales.rememberMe);
    }

    @Post('forgot-password')
    async forgotPassword(@Body() body: { email: string }) {
        const { email } = body;
        return this.authService.forgotPassword(email);
    }
}
