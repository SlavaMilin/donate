import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const SERVER_PORT = process.env.SERVER_PORT || 4000;
const isProd = process.env.NODE_ENV === 'production';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  if (isProd === false) {
    app.enableCors();
  }

  await app.listen(SERVER_PORT);
}
bootstrap();
