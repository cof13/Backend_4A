import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  //class validator

  app.useGlobalPipes(new ValidationPipe())
  //sawgger
  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Backend API Nest')
  .setDescription('Backend API Nest')
  .setVersion('1.0')
  .addTag('Api Rest')
  .build();
  const documet = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api',app,documet);
  await app.listen(3000);
}
bootstrap();
