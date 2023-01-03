import { UserService } from './../services/api/user/user.service';
import { UserProviders } from './../services/api/user/user.providers';
import { DatabaseModule } from '@Src/database/database.module';
import { AuthRepository } from './auth.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth } from 'src/services/entities/auth/auth.entity';
import { AuthProviders } from './auth.providers';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { NaverStrategy } from './strategy/naver.strategy';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [TypeOrmModule.forFeature([AuthRepository]), DatabaseModule],
  controllers: [AuthController],
  providers: [
    ...AuthProviders,
    AuthService,
    ...UserProviders,
    UserService,
    JwtService,
    // GoogleStrategy,
    // JwtStrategy,
    // NaverStrategy,
  ],
  exports: [...AuthProviders, AuthService],
})
export class AuthModule {}
