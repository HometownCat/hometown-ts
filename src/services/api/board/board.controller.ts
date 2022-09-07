import { CreateBoardDto } from './dtos/create.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from 'src/services/entities/board/board.entity';
import * as response from '../../../common/tools/response.tool';
import { Response } from 'express';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/list')
  @HttpCode(200)
  async findAll(@Res() res: Response) {
    const boards = await this.boardService.findAll();
    // return boards;
    response.success(res, boards);
  }

  @Get('/:id')
  @HttpCode(200)
  async findOneboard(@Res() res: Response, @Param('id') boardId: number) {
    const board = await this.boardService.findOne(boardId);
    // const data: Board = { ...board };
    // return board;
    response.success(res, board);
  }

  @Post('/set')
  @HttpCode(200)
  async setboard(@Res() res: Response, @Body() createBoardDto: CreateBoardDto) {
    const board = await this.boardService.save(createBoardDto);
    // return board;
    response.success(res, board);
  }
}
