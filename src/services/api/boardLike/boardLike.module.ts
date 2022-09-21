import { AuthService } from './../../../auth/auth.service';
import { BoardLikeProviders } from './boardLike.providers';
import { BoardProviders } from './../board/board.providers';
import { BoardLikeController } from './boardLike.controller';
import { DatabaseModule } from '@Src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BoardService } from '../board/board.service';
import { BoardLikeService } from './boardLike.service';
import { UserProviders } from '../user/user.providers';
import { UserService } from '../user/user.service';
import { AuthProviders } from '@Src/auth/auth.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BoardLikeController],
  providers: [
    ...BoardProviders,
    BoardService,
    ...BoardLikeProviders,
    BoardLikeService,
    ...UserProviders,
    UserService,
    ...AuthProviders,
    AuthService,
  ],
  exports: [...BoardLikeProviders, BoardLikeService],
})
export class LikeModule {}
