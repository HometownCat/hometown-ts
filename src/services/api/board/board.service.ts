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
  constructor(private boardRepository: BoardRepository) {}
  // constructor(
  //   @Inject('BOARD_REPOSITORY')
  //   private boardRepository: Repository<Board>,
  // ) {}
  async findOne(boardId: number): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });

    if (board === undefined)
      throw new HttpError(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND_BOARD);
    return board;
  }

  async findAll(): Promise<Board[]> {
    const boards = await this.boardRepository.find();
    if (boards === undefined)
      throw new HttpError(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND_BOARD);

    return boards;
  }

  async save(createboardDto: CreateBoardDto): Promise<Board> {
    let board = new Board();

    board = { ...createboardDto, ...board };

    try {
      board = await this.boardRepository.save(board);
    } catch (err) {
      throw new HttpError(HttpStatus.BAD_REQUEST, HttpMessage.FAIL_SAVE_BOARD);
    }
    return board;
  }
}