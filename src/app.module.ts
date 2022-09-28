import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
//import { ConfigModule } from '@nestjs/config';
import { ConfigService } from './config/config.service';
import { join } from 'path';
import { UserModule } from './services/api/user/user.module';
import { BoardModule } from './services/api/board/board.module';
import { CategoryModule } from './services/api/category/category.module';
import * as dotenv from 'dotenv';
import { User } from './services/entities/user/user.entity';
import { Auth } from './services/entities/auth/auth.entity';
import { Category } from './services/entities/category/category.entity';
import { Board } from './services/entities/board/board.entity';
import { BoardImage } from './services/entities/board/boardImage.entity';
import { BoardComment } from './services/entities/board/boardComment.entity';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CommentModule } from './services/api/boardComment/comment.module';
import { LikeModule } from './services/api/boardLike/boardLike.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { LoggerModule } from './common/utils/logger/logger.module';

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
        namingStrategy: new SnakeNamingStrategy(),
        keepConnectionAlive: true,
        logging: ['error'],
        timezone: '+09:00',
      }),
    }),
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
export class AppModule {}
