import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/services/entities/user/user.entity';

import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
