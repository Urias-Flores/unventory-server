/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { httpServerHandler } from 'cloudflare:node';
import { AppModule } from './app.module';

NestFactory.create(AppModule).then((app) => app.listen(3000));

export default httpServerHandler({ port: 3000 });
