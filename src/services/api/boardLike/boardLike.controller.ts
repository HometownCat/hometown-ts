import { BoardLikeDto } from './dtos/boardLike.dto';
import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import * as response from '../../../common/tools/response.tool';
import { Response, Request } from 'express';
import { BoardLikeService } from './boardLike.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('게시글 좋아요')
@ApiSecurity('x-api-key')
@Controller('boardLike')
export class BoardLikeController {
  constructor(private readonly boardLikeService: BoardLikeService) {}

  @ApiOperation({
    summary: '게시글 좋아요',
    description: '유저가 게시글 좋아요 클릭 시 사용되는 API',
  })
  @ApiBody({ type: BoardLikeDto })
  @ApiOkResponse({
    description: '성공',
  })
  @Post('/alterLike')
  @HttpCode(200)
  async alterLike(
    @Req() req: Request,
    @Res() res: Response,
    @Body() boardLikeDto: BoardLikeDto,
  ) {
    await this.boardLikeService.likeStatus(boardLikeDto, (err, result) => {
      if (err) {
        response.error(res, err);
      } else if (result) {
        if (result === 'up') {
          response.success(res, { message: 'like up' });
        } else if (result === 'down') {
          response.success(res, { message: 'like down' });
        } else {
          response.error(res, 'Not Found like task result');
        }
      }
    });
  }
}
