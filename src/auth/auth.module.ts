import { AuthRepository } from './auth.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth } from 'src/services/entities/auth/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthRepository])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
