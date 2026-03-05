import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve public/ folder as static assets (status.css, etc.)
  app.useStaticAssets(join(process.cwd(), 'public'));

  // Serve the status HTML page at /status via Express middleware.
  // This must be declared BEFORE the global prefix so it doesn't conflict.
  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get(
    '/status',
    (_req, res: { sendFile: (path: string) => void }) => {
      res.sendFile(join(process.cwd(), 'public', 'status.html'));
    },
  );

  // Global prefix for all API routes (no exclusions needed now)
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
