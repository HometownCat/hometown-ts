import { CreateBoardDto } from './dtos/create.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from 'src/services/entities/board/board.entity';
import * as response from '../../../common/tools/response.tool';
import { Response, Request } from 'express';
import { UpdateBoardDto } from './dtos/update.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/list')
  @HttpCode(200)
  async findAll(@Req() req: Request, @Res() res: Response) {
    const boards = await this.boardService.findAll();
    // return boards;
    response.success(res, boards);
  }

  @Get('/:id')
  @HttpCode(200)
  async findOneboard(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') boardId: number,
  ) {
    const board = await this.boardService.findOne(boardId);
    // const data: Board = { ...board };
    // return board;
    response.success(res, board);
  }

  @Post('/getNewId')
  @HttpCode(201)
  async setboard(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createBoardDto: CreateBoardDto,
  ) {
    await this.boardService.getNewId(createBoardDto, err => {
      if (err) {
        response.error(res, err);
      } else {
        response.success(res, { message: 'insert success' });
      }
    });
  }

  @Patch('/update/:boardId')
  @HttpCode(201)
  async updateOne(
    @Res() res: Response,
    @Param('boardId') boardId: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    await this.boardService.updateOne(boardId, updateBoardDto);

    response.success(res, { message: 'update success' });
  }

  @Delete('/delete/:boardId')
  @HttpCode(201)
  async deleteOne(@Res() res: Response, @Param('boardId') boardId: number) {
    await this.boardService.deleteOne(boardId);

    response.success(res, { message: 'delete success' });
  }
}
