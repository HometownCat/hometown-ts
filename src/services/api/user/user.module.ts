import { BoardProviders } from './../board/board.providers';
import { DatabaseModule } from '../../../database/database.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserProviders } from './user.providers';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { BoardLikeProviders } from '../boardLike/boardLike.providers';
import { BoardLikeService } from '../boardLike/boardLike.service';
import { BoardService } from '../board/board.service';
import { CommentProviders } from '../boardComment/comment.providers';
import { CommentService } from '../boardComment/comment.service';
import { AuthProviders } from '@Src/auth/auth.providers';
import { AuthService } from '@Src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { SnsProviders } from '@Src/auth/sns.providers';
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
    ...CommentProviders,
    CommentService,
    ...AuthProviders,
    AuthService,
    ...SnsProviders,
    JwtService,
  ],
  exports: [...UserProviders, UserService],
})
export class UserModule {}
