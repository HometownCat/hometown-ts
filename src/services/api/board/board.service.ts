import { ICallback } from '@Src/interfaces/common/common.interface';
import { User } from 'src/services/entities/user/user.entity';
import { UpdateBoardDto } from './dtos/update.dto';
import { BoardRepository } from './board.repository';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import HttpError from 'src/common/exceptions/http.exception';
import { CreateBoardDto } from './dtos/create.dto';
import { HttpMessage } from 'src/common/utils/errors/http-message.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/services/entities/board/board.entity';
import { Repository } from 'typeorm';
import * as async from 'async';
import * as _ from 'lodash';
import { BoardDto } from './dtos/board.dto';
import { BoardLike } from '@Src/services/entities/board/boardLike.entity';

@Injectable()
export class BoardService {
  //constructor(private boardRepository: BoardRepository) {}
  constructor(
    @Inject('BOARD_REPOSITORY')
    private boardRepository: Repository<Board>,
    @Inject('BOARDLIKE_REPOSITORY')
    private boardLikeRepository: Repository<BoardLike>,
  ) {}
  async findOne(boardId: number): Promise<Board> {
    // select * from board where id = ?
    try {
      // 조회 수 증가
      await this.boardRepository
        .createQueryBuilder()
        .update(Board)
        .set({
          viewCount: () => 'viewCount + 1',
        })
        .where('id = :boardId', { boardId: boardId })
        .execute();

      // 게시글 조회
      const board = await this.boardRepository
        .createQueryBuilder('board')
        .leftJoinAndSelect('board.boardImage', 'boardImage')
        .leftJoinAndSelect('board.boardComment', 'boardComment')
        .leftJoinAndSelect('board.boardLike', 'boardLike')
        .leftJoinAndSelect('board.user', 'user')
        .where('board.id = (:boardId)', { boardId })
        // .andWhere('board.userId = (:userId)', { userId })
        .getOne();

      if (board === undefined)
        throw new HttpError(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND_BOARD);

      return board;
    } catch (err) {
      console.log(err);
      throw new HttpError(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND_BOARD);
    }
  }

  async findAll(): Promise<Board[]> {
    const boards = await this.boardRepository.find({
      select: {
        user: { id: true },
      },
      relations: {
        boardComment: true,
        boardLike: true,
        boardImage: true,
        user: true,
      },
    });
    // boards = _.map(boards, board => {
    //   const {
    //     user: { id: userId },
    //   } = board;
    //   return { ...board, userId };
    // });

    if (boards === undefined)
      throw new HttpError(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND_BOARD);

    return boards;
  }

  async getNewId(
    createBoardDto: CreateBoardDto,
    callback: ICallback,
  ): Promise<Board> {
    let board = new Board();

    board = { ...board, ...createBoardDto };

    try {
      async.waterfall(
        [
          (callback: ICallback) => {
            this.boardRepository
              .save(board)
              .then(result => {
                callback(null, result);
              })
              .catch(err => {
                callback(err);
              });
          },
          (board: BoardDto, callback: ICallback) => {
            const { id: boardId, userId } = board;
            if (board) {
              this.boardLikeRepository
                .save({ boardId, userId })
                .then(result => {
                  callback(null, result);
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
        ],
        callback,
      );
    } catch (err) {
      throw new HttpError(HttpStatus.BAD_REQUEST, HttpMessage.FAIL_SAVE_BOARD);
    }

    return board;
  }

  async updateOne(
    boardId: number,
    updateBoardDto: UpdateBoardDto,
  ): Promise<void> {
    const { userId } = updateBoardDto;
    let board = await this.boardRepository.findOne({
      where: {
        id: boardId,
        userId: userId,
      },
    });

    try {
      if (board === null)
        throw new HttpError(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND_BOARD);
      else {
        board = { ...board, ...updateBoardDto };
        await this.boardRepository.save(board);
      }
    } catch (err) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        HttpMessage.FAIL_UPDATE_BOARD,
      );
    }
    return;
  }

  async deleteOne(boardId: number): Promise<Board> {
    const board = await this.findOne(boardId);

    if (board === undefined)
      throw new HttpError(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND_BOARD);

    try {
      await this.boardRepository
        .createQueryBuilder()
        .delete()
        .from(Board)
        .where('id = :id', { id: boardId })
        .execute();
    } catch (err) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        HttpMessage.FAIL_DELETE_BOARD,
      );
    }

    return board;
  }
}
