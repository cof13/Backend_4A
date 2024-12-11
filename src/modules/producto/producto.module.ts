import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { Producto } from './entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto])], // Registra la entidad Producto con TypeORM
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductoModule {}
