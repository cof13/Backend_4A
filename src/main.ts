import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //habilitamos CORS
  app.enableCors();

  //class validator
  app.useGlobalPipes(new ValidationPipe());

  //swagger
  const config = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The Produc API description')
  .setVersion('1.0')
  .addTag('produc')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api',app,document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
