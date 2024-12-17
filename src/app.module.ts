import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { DatabaseModule } from './database/database.module';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { PersonaModule } from './modules/persona/persona.module';
import { ProductoModule } from './modules/producto/producto.module';
import { RoleModule } from './modules/role/role.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { PedidoModule } from './modules/pedido/pedido.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [AuthModule, UsersModule, DatabaseModule, ConfigModule, CategoriaModule, PersonaModule, ProductoModule, RoleModule, ClienteModule, PedidoModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', // Cambia esto por el host de tu servidor de correo
        port: 587, // El puerto puede cambiar dependiendo de tu configuración SMTP
        auth: {
          user: 'leonardoedi1979@gmail.com', // Tu correo de usuario para autenticarte
          pass: 'jxpp jswc njdr zxhl', // La contraseña de tu cuenta
        },
        secure: false, // Si estás usando STARTTLS (en este caso es false para port 587)
      },
      defaults: {
        from: '"No Reply" <noreply@tudominio.com>', // Remitente predeterminado
      },
      template: {
        // Detecta si la aplicación está en desarrollo o producción
        dir: process.env.NODE_ENV === 'production'
          ? join(__dirname, '..', 'templates') // Ruta en producción (dist/templates)
          : join(__dirname, '..', '..', 'src', 'templates'), // Ruta en desarrollo (src/templates)
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    })
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, ConfigService], 
})
export class AppModule {}
