import { BoardDto } from './../board/dtos/board.dto';
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
    const { boardId, userId } = boardLikeDto;

    async.waterfall(
      [
        callback => callback(null, { boardId, userId }),
        (boardLikeDto: BoardLikeDto, callback: ICallback) => {
          const { boardId, userId } = boardLikeDto;

          this.boardLikeRepository
            .createQueryBuilder('boardLike')
            .where('boardId = (:boardId)', { boardId: boardId })
            .andWhere('userId = (:userId)', { userId: userId })
            .getOne()
            .then(result => {
              const returnData = { boardId, userId, ...result };
              callback(null, returnData);
            })
            .catch(err => {
              console.log(err);

              callback(err);
            });
        },
        // (boardLikeDto: BoardLikeDto, callback: ICallback) => {
        //   const { boardId, userId } = boardLikeDto;
        //   let { likeStatus } = boardLikeDto;

        //   if (typeof likeStatus !== 'undefined') {
        //     callback(null, boardLikeDto);
        //   } else {
        //     const saveData = {
        //       ...boardLikeDto,
        //       likeStatus: 0,
        //       boardId,
        //       userId,
        //     };

        //     this.boardLikeRepository
        //       .save(saveData)
        //       .then(() => {
        //         likeStatus = 0;
        //         callback(null, { boardId, userId, likeStatus });
        //       })
        //       .catch(err => {
        //         callback(err);
        //       });
        //   }
        // },
        (boardLikeDto: BoardLikeDto, callback: ICallback) => {
          const { likeStatus } = boardLikeDto;

          try {
            if (likeStatus === 1) {
              async.waterfall(
                [
                  (callback: ICallback) => {
                    this.boardRepository
                      .findOne({
                        where: {
                          id: boardId,
                          userId: userId,
                        },
                      })
                      .then(result => {
                        callback(null, result);
                      })
                      .catch(err => {
                        callback(err);
                      });
                  },
                  (board: BoardDto, callback: ICallback) => {
                    const { id } = board;
                    if (board) {
                      this.boardLikeRepository
                        .createQueryBuilder('board')
                        .update(Board)
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
                    } else {
                      throw new HttpError(
                        HttpStatus.NOT_FOUND,
                        HttpMessage.NOT_FOUND_BOARD,
                      );
                    }
                  },
                  (isUpdate: boolean, callback: ICallback) => {
                    if (isUpdate === true) {
                      this.boardLikeRepository
                        .createQueryBuilder('boardLike')
                        .update(BoardLike)
                        .set({
                          likeStatus: 0,
                        })
                        .where('boardId = (:boardId)', { boardId: boardId })
                        .execute()
                        .then(() => {
                          callback(null, 'down');
                        })
                        .catch(err => {
                          callback(err);
                        });
                    }
                  },
                ],
                callback,
              );
            } else if (likeStatus === 0) {
              async.waterfall(
                [
                  (callback: ICallback) => {
                    this.boardRepository
                      .findOne({
                        where: {
                          id: boardId,
                          userId: userId,
                        },
                      })
                      .then(result => {
                        callback(null, result);
                      })
                      .catch(err => {
                        callback(err);
                      });
                  },
                  (board: BoardDto, callback: ICallback) => {
                    const { id } = board;
                    if (board) {
                      this.boardLikeRepository
                        .createQueryBuilder('board')
                        .update(Board)
                        .set({
                          likeCount: () => 'likeCount + 1',
                        })
                        .where('id = (:id)', { id: id })
                        .execute()
                        .then(() => {
                          callback(null, true);
                        })
                        .catch(err => {
                          callback(err);
                        });
                    } else {
                      throw new HttpError(
                        HttpStatus.NOT_FOUND,
                        HttpMessage.NOT_FOUND_BOARD,
                      );
                    }
                  },
                  (isUpdate: boolean, callback: ICallback) => {
                    if (isUpdate === true) {
                      this.boardLikeRepository
                        .createQueryBuilder('boardLike')
                        .update(BoardLike)
                        .set({
                          likeStatus: 1,
                        })
                        .where('boardId = (:boardId)', { boardId: boardId })
                        .execute()
                        .then(() => {
                          callback(null, 'up');
                        })
                        .catch(err => {
                          callback(err);
                        });
                    }
                  },
                ],
                callback,
              );
            }
          } catch (err) {
            console.log(err);
            throw new HttpError(
              HttpStatus.BAD_REQUEST,
              HttpMessage.FAIL_UPDATE_LIKE,
            );
          }
        },
      ],
      callback,
    );
  }
}
