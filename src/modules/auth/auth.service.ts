import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>) { }

  async funRegister(objUser: RegisterAuthDto) {
    const { password } = objUser;
    const plainToHash = await hash(password, 12);
    objUser = { ...objUser, password: plainToHash };
    return this.userRepository.save(objUser);
  }

  async login(credenciales: LoginAuthDto, rememberMe: boolean) {
    const { email, password } = credenciales;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) return new HttpException('Usuario no encontrado', 404);

    const verificarPass = await compare(password, user.password);
    if (!verificarPass) throw new HttpException('Password invalido', 401);

    const payload = { email: user.email, id: user.id };
    const expiresIn = rememberMe ? '2m' : '1m';

    const token = this.jwtService.sign(payload, { expiresIn });
    return { user: user, token };
  }

  async forgotPassword(email: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('Usuario no encontrado', 404);
    }
    const resetToken = this.jwtService.sign({ email: user.email }, { expiresIn: '1h' });
    if (!resetToken) {
      console.error('Error al generar el token JWT');
      throw new HttpException('Error al generar el token', 500);
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'aic4900@gmail.com',
        pass: '123456'
      }
    });

    const mailOptions = {
      from: 'aic4900@gmail.com',
      to: email,
      subject: 'Restablecer contraseña',
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña: http://localhost:3000/reset-password/${resetToken}`
    };

    try {
      await transporter.sendMail(mailOptions);
      return { message: 'Correo de restablecimiento enviado' };
    } catch (error) {
      throw new HttpException('Error al enviar correo', 500);
    }
  }
}
