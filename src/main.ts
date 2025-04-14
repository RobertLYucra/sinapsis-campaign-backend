import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { configure } from '@vendia/serverless-express';
import { Handler } from 'aws-lambda';
import { ValidationPipe } from '@nestjs/common';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  app.enableCors({
    origin: '*',  
    methods: 'GET,POST,PUT,DELETE,OPTIONS, PATCH',
    allowedHeaders: 'Content-Type, Authorization',
  });


  // Configurar validaciones globales
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('Campaign API')
    .setDescription('API para gestionar campañas')
    .setVersion('1.0')
    .addTag('Campaigns')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  await app.init();
}

bootstrap().then(() => console.log('NestJS App Initialized'));

export const handler: Handler = configure({ app: expressApp });
 