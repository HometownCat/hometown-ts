import * as morgan from 'morgan';

import { ValidationPipe } from '@nestjs/common';
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

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
      transform: true,
      skipMissingProperties: true,
    }),
  );
  // CORS
  app.enableCors();

  // client ip
  app.use(requestIp.mw());

  // Proxy
  app.enable('trust proxy');

  // Filter
  app.useGlobalFilters(new CatchException());

  const port = process.env.PORT;
  const host = process.env.HOST;
  await app.listen(port || 3000, host);
}

bootstrap();
