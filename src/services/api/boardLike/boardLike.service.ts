import { BoardLikeDto } from './dtos/boardLike.dto';
import { Repository } from 'typeorm';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BoardLike } from '@Src/services/entities/board/boardLike.entity';
import HttpError from '@Src/common/exceptions/http.exception';
import { HttpMessage } from '@Src/common/utils/errors/http-message.enum';
import { ICallback } from '@Src/interfaces/common/common.interface';
import * as async from 'async';
import * as _ from 'lodash';
import { Board } from '@Src/services/entities/board/board.entity';
import { User } from '@Src/services/entities/user/user.entity';
@Injectable()
export class BoardLikeService {
  constructor(
    @Inject('BOARDLIKE_REPOSITORY')
    private boardLikeRepository: Repository<BoardLike>,
    @Inject('BOARD_REPOSITORY')
    private boardRepository: Repository<Board>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async likeStatus(boardLikeDto: BoardLikeDto, callback: ICallback) {
    const { boardId, userId, likeStatus, id } = boardLikeDto;
    try {
      if (likeStatus === 1) {
        async.waterfall(
          [
            (callback: ICallback) => {
              Promise.all([
                this.boardRepository.findOne({
                  where: {
                    id: boardId,
                  },
                }),
                this.userRepository.findOne({
                  where: {
                    id: userId,
                  },
                }),
              ])
                .then(() => {
                  callback(null, true);
                })
                .catch(err => {
                  callback(err);
                });
            },
            (callback: ICallback) => {
              this.boardLikeRepository
                .createQueryBuilder()
                .update(BoardLike)
                .set({
                  likeCount: () => 'likeCount - 1',
                })
                .where('id = :id', { id: id })
                .execute()
                .then(() => {
                  callback(null, true);
                })
                .catch(err => {
                  callback(err);
                });
            },
            (callback: ICallback) => {
              this.boardLikeRepository
                .createQueryBuilder()
                .update(BoardLike)
                .set({
                  likeStatus: 1,
                })
                .where('id = :id', { id: id })
                .execute()
                .then(() => {
                  callback(null, true);
                })
                .catch(err => {
                  callback(err);
                });
            },
          ],
          callback,
        );
      } else if (likeStatus === 0) {
        async.waterfall(
          [
            (callback: ICallback) => {
              Promise.all([
                this.boardRepository.findOne({
                  where: {
                    id: boardId,
                  },
                }),
                this.userRepository.findOne({
                  where: {
                    id: userId,
                  },
                }),
              ])
                .then(() => {
                  callback(null, true);
                })
                .catch(err => {
                  callback(err);
                });
            },
            (callback: ICallback) => {
              this.boardLikeRepository
                .createQueryBuilder()
                .update(BoardLike)
                .set({
                  likeCount: () => 'likeCount + 1',
                })
                .where('id = :id', { id: id })
                .execute()
                .then(() => {
                  callback(null, true);
                })
                .catch(err => {
                  callback(err);
                });
            },
            (callback: ICallback) => {
              this.boardLikeRepository
                .createQueryBuilder()
                .update(BoardLike)
                .set({
                  likeStatus: 1,
                })
                .where('id = :id', { id: id })
                .execute()
                .then(() => {
                  callback(null, true);
                })
                .catch(err => {
                  callback(err);
                });
            },
          ],
          callback,
        );
      }
    } catch (err) {
      console.log(err);
      throw new HttpError(HttpStatus.BAD_REQUEST, HttpMessage.FAIL_UPDATE_LIKE);
    }
  }
}
