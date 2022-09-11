import { UpdateBoardDto } from './dtos/update.dto';
import { BoardRepository } from './board.repository';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import HttpError from 'src/common/exceptions/http.exception';
import { CreateBoardDto } from './dtos/create.dto';
import { HttpMessage } from 'src/common/utils/errors/http-message.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/services/entities/board/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  //constructor(private boardRepository: BoardRepository) {}
  constructor(
    @Inject('BOARD_REPOSITORY')
    private boardRepository: Repository<Board>,
  ) {}
  async findOne(boardId: number): Promise<Board> {
    // select * from board where id = ?
    const board = await this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.boardImage', 'boardImage')
      .leftJoinAndSelect('board.boardComment', 'boardComment')
      .where('board.id = (:boardId)', { boardId })
      .getOne();

    if (board === undefined)
      throw new HttpError(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND_BOARD);

    return board;
  }

  async findAll(): Promise<Board[]> {
    // test
    // select * from board
    // const boards = await this.boardRepository.find({
    //   select: [
    //     'id',
    //     'title',
    //     'content',
    //     'viewCount',
    //     'likeCount',
    //     'commentCount',
    //     'createdAt',
    //     'updatedAt',
    //     'userId',
    //   ],
    //   relations: ['boardComment', 'boardImage', 'user.id = board.userId'],
    // });

    const boards = await this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.boardImage', 'boardImage')
      .leftJoinAndSelect('board.boardComment', 'boardComment')
      .leftJoinAndSelect('board.user', 'user')
      .getMany();
    if (boards === undefined)
      throw new HttpError(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND_BOARD);

    return boards;
  }

  async save(createBoardDto: CreateBoardDto): Promise<Board> {
    let board = new Board();

    board = { ...createBoardDto, ...board };

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
    let board = await this.findOne(boardId);

    if (board === undefined)
      throw new HttpError(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND_BOARD);

    board = { ...board, ...updateBoardDto };
    try {
      await this.boardRepository.save(board);
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
