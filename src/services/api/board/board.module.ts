import { CommentService } from './../boardComment/comment.service';
import { DatabaseModule } from './../../../database/database.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { BoardProviders } from './board.providers';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';
import { CommentProviders } from '../boardComment/comment.providers';
import { BoardLikeProviders } from '../boardLike/boardLike.providers';
import { BoardLikeService } from '../boardLike/boardLike.service';
import { UserProviders } from '../user/user.providers';
import { UserService } from '../user/user.service';
import { AuthProviders } from '@Src/auth/auth.providers';
import { AuthService } from '@Src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { SnsProviders } from '@Src/auth/sns.providers';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository]), DatabaseModule],
  controllers: [BoardController],
  providers: [
    ...BoardProviders,
    BoardService,
    ...CommentProviders,
    CommentService,
    ...BoardLikeProviders,
    BoardLikeService,
    ...UserProviders,
    UserService,
    ...AuthProviders,
    AuthService,
    ...SnsProviders,
    JwtService,
  ],
  exports: [...BoardProviders, BoardService],
})
export class BoardModule {}
