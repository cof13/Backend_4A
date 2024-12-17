import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private mailerService: MailerService
  ) {}

  // Método para registrar un nuevo usuario
  async register(registerAuthDto: RegisterAuthDto) {
    const { name, mail, password } = registerAuthDto;
  
    // Verificar si el correo ya está registrado
    const existingUser = await this.usersService.findByEmail(mail);
    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }
  
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Crear un nuevo usuario
    const newUser: CreateUserDto = {
      name,
      mail,
      password: hashedPassword,
    };
  
    const user = await this.usersService.create(newUser);
  
    // Generar token JWT
    const payload = { mail: user.mail, id: user.id };
    const token = this.jwtService.sign(payload);
  
    // Excluir la contraseña de la respuesta
    const { password: _, ...userData } = user;
  
    return { user: userData, token };
  }
  

  // Método de login
  async login(loginAuthDto: LoginAuthDto) {
    const { mail, password } = loginAuthDto;
  
    const user = await this.usersService.findByEmail(mail);
    if (!user) {
      throw new UnauthorizedException('Correo incorrecto');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }
  
    const payload = { email: user.mail, id: user.id };
    const token = this.jwtService.sign(payload);
  
    return { token };
  } 

   // Método para solicitar restablecimiento de contraseña
   async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { name, email } = forgotPasswordDto;

    // Buscar al usuario por nombre y correo electrónico
    const user = await this.usersService.findByNameAndEmail(name, email);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado con los datos proporcionados');
    }

    // Generar un token de restablecimiento de contraseña
    const payload = { email: user.mail, sub: user.id };
    const resetToken = this.jwtService.sign(payload, { expiresIn: '1h' }); // Token válido por 1 hora

    // Aquí deberías enviar el token al correo electrónico del usuario.
    // Por simplicidad, retornaremos el token en la respuesta.
    // En producción, usa un servicio de correo electrónico para enviar el token.
    // Construir la URL de restablecimiento (debería apuntar a tu front-end)
     const resetUrl = `http://localhost:4200/auth/reset-password?token=${resetToken}`;

    // Enviar correo electrónico 
    await this.mailerService.sendMail({
       to: user.mail,
        subject: 'Recuperación de contraseña',
         template: 'forgot-password', // Ruta a tu plantilla de correo 
         context: {
           name: user.name, 
           url: resetUrl,
           },
           });

    return { message: 'Se ha enviado un enlace de restablecimiento de contraseña a su correo electrónico', resetToken };
  }

  // Método para cambiar la contraseña
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { newPassword, token } = resetPasswordDto;
  
    try {
      const payload = this.jwtService.verify(token);
      const userId = payload.sub;
  
      // Encriptar la nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Actualizar la contraseña del usuario
      await this.usersService.updatePassword(userId, hashedPassword);
  
      return { message: 'Contraseña actualizada correctamente' };
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
  

  // Método para validar el token de restablecimiento
  async verifyResetToken(token: string): Promise<number> {
    try {
      const payload = this.jwtService.verify(token);
      return payload.sub; // Retorna el ID del usuario
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }



  
}