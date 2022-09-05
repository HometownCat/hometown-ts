import { UserModule } from './api/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from './config/config.service';
import { CategoryModule } from './api/category/category.module';
import { BoardModule } from './api/board/board.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      // name: 'hometown',
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      // entities:
      //   process.env.NODEMON_START === 'TRUE'
      //     ? ['src/api/entities/**/*.entity{.ts,.js}']
      //     : ['dist//api/entities/**/*.entity{.ts,.js}'],
      logging: process.env.ENVIRONMENT === 'development',
      synchronize: false,
      extra: {
        connectionLimit: process.env.ENVIRONMENT === 'development' ? 18 : 38,
      },
    }),
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
