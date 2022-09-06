import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { BoardComment } from '@Src/services/entities/board/boardComment.entity';
import { Response } from 'express';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create.dto';
import * as response from '../../../common/tools/response.tool';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/register')
  @HttpCode(201)
  async setComment(
    @Res() res: Response,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const comment = await this.commentService.setComment(createCommentDto);
    // return comment;
    response.success(res, comment);
  }
}
