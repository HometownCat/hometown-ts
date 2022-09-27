import * as morgan from 'morgan';

// import { ValidationPipe } from './../pipe/validationPipe';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import CatchException from './common/filters/http-exception.filter';
import { LoggerService } from './common/utils/logger/logger.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { setupSwagger } from './config/swagger/setup';
import * as compression from 'compression';
import * as requestIp from 'request-ip';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as hpp from 'hpp';
import * as dotenv from 'dotenv';
import * as helmet from 'helmet';
import * as cors from 'cors';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const prod = process.env.NODE_ENV === 'production';
  if (prod) {
    app.enable('trust proxy');
    app.use(morgan('combined'));
    // app.use(helmet({ contentSecurityPolicy: false }));
    app.use(hpp());
  } else {
    app.use(morgan('dev'));
    app.use(
      cors({
        origin: true,
        credentials: true,
      }),
    );
  }

  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
      transform: true,
      skipMissingProperties: true,
    }),
  );
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     // forbidNonWhitelisted: true,
  //     transform: true,
  //     skipMissingProperties: true,
  //   }),
  // );

  // CORS
  // app.enableCors();

  // client ip
  app.use(requestIp.mw());
  app.setGlobalPrefix('/api');
  // Proxy
  app.enable('trust proxy');

  // Filter
  app.useGlobalFilters(new CatchException());

  const port = process.env.PORT;
  const host = process.env.HOST;
  await app.listen(port || 3000, host);
}

bootstrap();
