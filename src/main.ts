import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:3000', 'https://comercial-nataren.netlify.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: 'Content-type, Authorization',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
