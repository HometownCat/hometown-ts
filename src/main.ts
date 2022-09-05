import * as morgan from 'morgan';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import CatchException from './common/filters/http-exception.filter';
import { LoggerService } from './common/utils/logger/logger.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { setupSwagger } from './config/swagger/setup';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import * as requestIp from 'request-ip';

import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const env: string = process.env.ENVIRONMENT;
  const app =
    env === 'development'
      ? await NestFactory.create(AppModule)
      : await NestFactory.create(AppModule, { logger: ['error'] });
  const configService = app.select(ConfigModule).get(ConfigService);
  const loggerService = app.select(ConfigModule).get(LoggerService);

  // CORS
  app.enableCors(configService.corsConfig);

  // Proxy

  // Validation
  app.useGlobalPipes(new ValidationPipe(configService.validationConfig));

  // Filter
  app.useGlobalFilters(new CatchException());

  // client ip
  app.use(requestIp.mw());

  // Logger
  app.useLogger(loggerService);
  app.use(
    morgan(
      'HTTP/:http-version :method :remote-addr :url :remote-user :status :res[content-length] :referrer :user-agent :response-time ms',
      {
        skip: (req) => req.url === '/favicon.ico' || req.url === '/',
        stream: {
          write: (message) => {
            loggerService.http(message);
          },
        },
      },
    ),
  );
  console.log(process.env.DATABASE_DATABASE);

  // Swagger
  if (['development'].includes(configService.env)) {
    setupSwagger(app, configService.swaggerConfig);
  }

  const port = configService.get('PORT');
  const host = configService.get('HOST');
  await app.listen(port || 3000, host);

  if (configService.env === 'development') {
    console.log(configService.env);
  }

  loggerService.warn(`server running on port ${host}:${port}`);
}
bootstrap();
