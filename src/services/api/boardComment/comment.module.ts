import { BoardLikeService } from './../boardLike/boardLike.service';
import { CommentController } from './comment.controller';
import { BoardProviders } from './../board/board.providers';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@Src/database/database.module';
import { CommentProviders } from './comment.providers';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { BoardService } from '../board/board.service';
import { BoardLikeProviders } from '../boardLike/boardLike.providers';
import { UserProviders } from '../user/user.providers';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository]), DatabaseModule],
  controllers: [CommentController],
  providers: [
    ...CommentProviders,
    CommentService,
    ...BoardProviders,
    BoardService,
    ...BoardLikeProviders,
    BoardLikeService,
    ...UserProviders,
    UserService,
  ],
  exports: [...CommentProviders, CommentService],
})
export class CommentModule {}
