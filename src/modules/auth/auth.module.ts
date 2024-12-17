import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports:[
    JwtModule.register({
      secret: "MI_CODIGO_SECRETO",
      signOptions:{expiresIn:'3600S'}
    }),
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[AuthService,JwtModule]

})
export class AuthModule {}
