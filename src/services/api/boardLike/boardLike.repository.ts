import { BoardLike } from '@Src/services/entities/board/boardLike.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BoardLikeDto } from './dtos/boardLike.dto';
import HttpError from '@Src/common/exceptions/http.exception';
import { HttpMessage } from '@Src/common/utils/errors/http-message.enum';

@Injectable()
export class BoardLikeRepository extends Repository<BoardLike> {
  constructor(private dataSource: DataSource) {
    super(BoardLike, dataSource.createEntityManager());
  }

  async likeInit(boardId: number, userId: number): Promise<void> {
    try {
      await this.save({ boardId, userId });
    } catch (err) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        HttpMessage.INSERT_FAIL,
      );
    }
  }
}
