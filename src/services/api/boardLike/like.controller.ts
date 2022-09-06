import { UpdateLikeDto } from './dtos/update.dto';
import { LikeService } from './like.service';
import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import * as response from '../../../common/tools/response.tool';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('/up')
  @HttpCode(201)
  async upLike(@Res() res: Response, @Body() updateLikeDto: UpdateLikeDto) {
    const like = await this.likeService.upLike(updateLikeDto);
    response.success(res, like);
  }

  @Post('/down')
  @HttpCode(201)
  async downLike(@Res() res: Response, @Body() updateLikeDto: UpdateLikeDto) {
    const like = await this.likeService.downLike(updateLikeDto);
    response.success(res, like);
  }
}
