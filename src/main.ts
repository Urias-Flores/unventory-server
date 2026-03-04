import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:3000', 'https://comercial-nataren.netlify.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: 'Content-type, Authorization',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Unventory API')
    .setDescription('Documentación de la API de Unventory')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
