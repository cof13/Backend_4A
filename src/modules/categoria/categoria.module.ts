import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { CategoriaProviders } from './categoria.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriaController],
  providers: [CategoriaService,...CategoriaProviders],
})
export class CategoriaModule {}
