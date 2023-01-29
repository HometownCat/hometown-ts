import { ParamsInitMiddleware } from './../middlewares/paramsInit.middleware';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { UserModule } from './services/api/user/user.module';
import { BoardModule } from './services/api/board/board.module';
import { CategoryModule } from './services/api/category/category.module';
import * as dotenv from 'dotenv';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';

import { CommentModule } from './services/api/boardComment/comment.module';
import { LikeModule } from './services/api/boardLike/boardLike.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { LoggerModule } from './common/utils/logger/logger.module';
import { ValidationMiddleware } from 'middlewares/validation.middleware';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      //imports: [ConfigModule],
      useFactory: () => ({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: 3306,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        synchronize: false,
        entities: [join(__dirname + '/**/*.entity{.ts,.js}')],
        // namingStrategy: new SnakeNamingStrategy(),
        keepConnectionAlive: true,
        logging: true,
        timezone: '+09:00',
      }),
    }),
    // DatabaseModule,
    UserModule,
    BoardModule,
    LikeModule,
    CommentModule,
    CategoryModule,
    AuthModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // x-api-key validation
    consumer.apply(ValidationMiddleware, ParamsInitMiddleware).forRoutes('*');
  }
}
