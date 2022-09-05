import { CreateBoardDto } from './dtos/create.dto';
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from 'src/services/entities/board/board.entity';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/all')
  @HttpCode(200)
  async findAll(): Promise<Board[]> {
    const boards = await this.boardService.findAll();
    return boards;
  }

  @Get('/:id')
  @HttpCode(200)
  async findOneBoard(@Param('id') boardId: number): Promise<Board> {
    const board = await this.boardService.findOne(boardId);
    // const data: Board = { ...board };
    return board;
  }

  @Post('/set')
  @HttpCode(200)
  async setBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    const board = await this.boardService.save(createBoardDto);
    return board;
  }
}
