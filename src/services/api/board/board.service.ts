import { ICallback } from '@Src/interfaces/common/common.interface';
import { UpdateBoardDto } from './dtos/update.dto';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import HttpError from 'src/common/exceptions/http.exception';
import { CreateBoardDto } from './dtos/create.dto';
import { HttpMessage } from 'src/common/utils/errors/http-message.enum';
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
  async findOne(boardId: number, boardDto: BoardDto, callback: ICallback) {
    const { userId } = boardDto;

    try {
      // 조회 수 증가
      async.waterfall(
        [
          callback => callback(null, { id: boardId, userId }),
          (boardDto: BoardDto, callback: ICallback) => {
            const { id } = boardDto;

            this.boardRepository
              .createQueryBuilder()
              .update(Board)
              .set({
                viewCount: () => 'viewCount + 1',
              })
              .where('id = :id', { id: id })
              .execute()
              .then(() => {
                callback(null, { ...boardDto, id });
              })
              .catch(err => {
                console.log(err);
                callback(err);
              });
          },
          (boardDto: BoardDto, callback: ICallback) => {
            const { id, userId } = boardDto;

            this.boardRepository
              .createQueryBuilder('board')
              .leftJoinAndSelect('board.boardImage', 'boardImage')
              .leftJoinAndSelect('board.boardComment', 'boardComment')
              .leftJoinAndSelect('board.boardLike', 'boardLike')
              .where('board.id = (:id)', { id: id })
              .andWhere('board.userId = (:userId)', { userId: userId })
              .getOne()
              .then(result => {
                if (result === null)
                  throw new HttpError(
                    HttpStatus.NOT_FOUND,
                    HttpMessage.NOT_FOUND_BOARD,
                  );

                const { boardLike, id: boardId } = result;

                if (boardLike.length === 0) {
                  this.boardLikeRepository
                    .save({ boardId, userId })
                    .then(saveData => {
                      let { boardId, userId, id } = saveData;
                      boardId = +boardId;
                      userId = +userId;
                      id = +id;
                      const returnData = {
                        ...result,
                        boardLike: { ...saveData, boardId, userId, id },
                      };
                      callback(null, returnData);
                    })
                    .catch(err => {
                      console.log(err);

                      callback(err);
                    });
                } else {
                  callback(null, result);
                }
              })
              .catch(err => {
                console.log(err);

                callback(err);
              });
          },
        ],
        callback,
      );
    } catch (err) {
      console.log(err);
      throw new HttpError(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND_BOARD);
    }
  }

  async findAll(): Promise<Board[]> {
    const boards = await this.boardRepository.find({
      select: {
        user: { id: true, username: true, status: true },
      },
      relations: {
        boardComment: true,
        boardImage: true,
        user: true,
      },
    });

    if (boards === undefined)
      throw new HttpError(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND_BOARD);

    return boards;
  }

  async getNewId(
    createBoardDto: CreateBoardDto,
    // callback: ICallback,
  ): Promise<Board> {
    let board = new Board();

    board = { ...board, ...createBoardDto };

    try {
      board = await this.boardRepository.save(board);
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
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });

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

  async ranking(): Promise<Board[]> {
    let boards = await this.boardRepository.find({
      select: {
        user: { id: true },
        boardLike: {
          id: true,
          likeStatus: true,
          user: { id: true, username: true },
          board: { id: true },
        },
      },
      relations: {
        boardComment: true,
        boardLike: { user: true, board: true },
        boardImage: true,
        user: true,
      },
      order: {
        likeCount: 'DESC',
      },
      take: 5,
    });

    boards = _.map(boards, board => {
      const {
        boardLike,
        boardComment,
        boardImage,
        user: { id: userId },
        id,
        title,
        content,
        viewCount,
        likeCount,
        commentCount,
        createdAt,
        updatedAt,
      } = board;
      const like = _.map(boardLike, item => {
        const {
          id,
          likeStatus,
          user: { id: userId, username },
          board: { id: boardId },
        } = item;

        return { id, likeStatus, userId, username, boardId };
      });
      return {
        id,
        title,
        content,
        viewCount,
        likeCount,
        commentCount,
        createdAt,
        updatedAt,
        userId,
        boardComment,
        boardImage,
        boardLike: like,
      };
    });

    if (boards === undefined)
      throw new HttpError(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND_BOARD);

    return boards;
  }
}
