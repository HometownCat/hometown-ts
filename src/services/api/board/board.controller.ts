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
import * as response from '../../../common/tools/response.tool';
import { Response, Request } from 'express';
import { UpdateBoardDto } from './dtos/update.dto';
import { BoardDto } from './dtos/board.dto';
import {
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiSecurity,
  ApiQuery,
} from '@nestjs/swagger';

@Controller('board')
@ApiTags('게시글')
@ApiSecurity('x-api-key')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiOperation({
    summary: '게시글 ID 생성',
    description: '게시글 작성 클릭 시 게시글 ID 생성 API',
  })
  @ApiBody({ type: CreateBoardDto })
  @ApiOkResponse({
    description: '성공',
  })
  @Post('/getNewId')
  @HttpCode(201)
  async setBoard(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createBoardDto: CreateBoardDto,
  ) {
    const { id } = await this.boardService.getNewId(createBoardDto);
    response.success(res, { boardId: id, message: 'insert success' });
  }

  @ApiOperation({
    summary: '게시글 리스트',
    description: '메인 페이지에 게시글 리스트 조회 API',
  })
  @ApiOkResponse({
    description: '성공',
  })
  @Get('/feed')
  @HttpCode(200)
  async findAll(@Req() req: Request, @Res() res: Response) {
    const boards = await this.boardService.findAll();
    // return boards;
    response.success(res, boards);
  }

  @ApiOperation({
    summary: '한 게시글 조회',
    description: '유저가 게시글 조회 시 사용되는 API',
  })
  @ApiBody({ type: BoardDto })
  @ApiOkResponse({
    description: '성공',
  })
  @Post('/:id')
  @HttpCode(200)
  async findOneboard(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') boardId: number,
    @Body() boardDto: BoardDto,
  ) {
    await this.boardService.findOne(boardId, boardDto, (err, result) => {
      if (err) {
        response.error(res, err);
      } else {
        response.success(res, result);
      }
    });
    // const data: Board = { ...board };
    // return board;
  }

  @ApiOperation({
    summary: '게시글 수정',
    description: '유저가 게시글 수정 시 사용되는 API',
  })
  @ApiBody({ type: UpdateBoardDto })
  @ApiQuery({
    name: 'boardId',
    required: true,
    type: Number,
  })
  @ApiOkResponse({
    description: '성공',
  })
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

  @ApiOperation({
    summary: '게시글 삭제',
    description: '유저가 게시글 삭제 시 사용되는 API',
  })
  @ApiQuery({
    name: 'boardId',
    required: true,
    type: Number,
  })
  @ApiOkResponse({
    description: '성공',
  })
  @Delete('/delete/:boardId')
  @HttpCode(201)
  async deleteOne(@Res() res: Response, @Param('boardId') boardId: number) {
    const { id } = await this.boardService.deleteOne(boardId);

    response.success(res, { boardId: id, message: 'delete success' });
  }

  @ApiOperation({
    summary: '게시글 랭킹',
    description: '좋아요 순으로 5등까지의 게시글 리스트 API',
  })
  @ApiOkResponse({
    description: '성공',
  })
  @Get('/ranking')
  @HttpCode(200)
  async ranking(@Res() res: Response, @Req() req: Request) {
    const ranking = await this.boardService.ranking();
    response.success(res, ranking);
  }
}
