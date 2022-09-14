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

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository]), DatabaseModule],
  controllers: [BoardController],
  providers: [
    ...BoardProviders,
    BoardService,
    ...CommentProviders,
    CommentService,
  ],
  exports: [...BoardProviders, BoardService],
})
export class BoardModule {}
