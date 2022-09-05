import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from './config/config.service';
import { join } from 'path';
import { UserModule } from './services/api/user/user.module';
import { BoardModule } from './services/api/board/board.module';
import { CategoryModule } from './services/api/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      name: 'hometown',
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')] || [
        'dist/**/*.entity.js',
      ],
      logging: process.env.ENVIRONMENT === 'development',
      synchronize: false,
      extra: {
        connectionLimit: process.env.ENVIRONMENT === 'development' ? 18 : 38,
      },
    }),
    // TypeOrmModule.forRoot({
    //   name: 'hometown',
    //   type: 'mysql',
    //   host: process.env.DATABASE_HOST,
    //   port: process.env.DATABASE_PORT,
    //   username: process.env.DATABASE_USERNAME,
    //   password: process.env.DATABASE_PASSWORD,
    //   database: process.env.DATABASE_DATABASE,
    //   entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    //   // entities:
    //   //   process.env.NODEMON_START === 'TRUE'
    //   //     ? ['src/api/entities/**/*.entity{.ts,.js}']
    //   //     : ['dist/api/entities/**/*.entity{.ts,.js}'],
    //   logging: process.env.ENVIRONMENT === 'development',
    //   synchronize: true,
    //   extra: {
    //     connectionLimit: process.env.ENVIRONMENT === 'development' ? 18 : 38,
    //   },
    // }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => configService.typeOrmConfig,
    // }),
    UserModule,
    BoardModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
