import { BoardProviders } from './../board/board.providers';
import { DatabaseModule } from '../../../database/database.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/services/entities/user/user.entity';

import { UserController } from './user.controller';
import { UserProviders } from './user.providers';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { BoardLikeProviders } from '../boardLike/boardLike.providers';
import { BoardLikeService } from '../boardLike/boardLike.service';
import { BoardService } from '../board/board.service';
@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), DatabaseModule],
  controllers: [UserController],
  providers: [
    ...UserProviders,
    UserService,
    ...BoardLikeProviders,
    BoardLikeService,
    ...BoardProviders,
    BoardService,
  ],
  exports: [...UserProviders, UserService],
})
export class UserModule {}
