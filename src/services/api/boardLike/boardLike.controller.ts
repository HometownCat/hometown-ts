import { BoardLikeDto } from './dtos/boardLike.dto';
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
import * as response from '../../../common/tools/response.tool';
import { Response, Request } from 'express';
import { BoardLikeService } from './boardLike.service';

@Controller('boardLike')
export class BoardLikeController {
  constructor(private readonly boardLikeService: BoardLikeService) {}

  @Post('/alterLike')
  @HttpCode(200)
  async alterLike(
    @Req() req: Request,
    @Res() res: Response,
    @Body() boardLikeDto: BoardLikeDto,
  ) {
    const { likeStatus } = boardLikeDto;
    if (likeStatus === 1) {
      await this.boardLikeService.likeStatus(boardLikeDto, err => {
        if (err) {
          response.error(res, err);
        } else {
          response.success(res, { message: 'like down' });
        }
      });
    } else if (likeStatus === 0) {
      await this.boardLikeService.likeStatus(boardLikeDto, err => {
        if (err) {
          response.error(res, err);
        } else {
          response.success(res, { message: 'like up' });
        }
      });
    } else {
      response.notFound('Not found LikeStatus');
    }
  }
}
