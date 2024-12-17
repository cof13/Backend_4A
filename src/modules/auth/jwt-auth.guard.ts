// src/modules/auth/jwt.guard.ts
import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Obtiene el token desde el header 'Authorization'

    if (!token) {
      throw new Error('Token no proporcionado');
    }

    try {
      const user = this.jwtService.verify(token);  // Verifica si el token es válido
      request.user = user;
      return true;
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }
}
