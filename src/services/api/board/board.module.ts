import { CommentService } from './../boardComment/comment.service';
import { DatabaseModule } from './../../../database/database.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/services/entities/board/board.entity';
import { BoardController } from './board.controller';
import { BoardProviders } from './board.providers';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';
import { CommentProviders } from '../boardComment/comment.providers';
import { BoardLikeProviders } from '../boardLike/boardLike.providers';
import { BoardLikeService } from '../boardLike/boardLike.service';
import { UserProviders } from '../user/user.providers';
import { UserService } from '../user/user.service';

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
  ],
  exports: [...BoardProviders, BoardService],
})
export class BoardModule {}
