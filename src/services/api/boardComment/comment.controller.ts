import { DeleteCommentDto } from './dtos/delete.dto';
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
import { BoardComment } from '@Src/services/entities/board/boardComment.entity';
import { Response } from 'express';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create.dto';
import * as response from '../../../common/tools/response.tool';
import { UpdateCommentDto } from './dtos/update.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/list')
  @HttpCode(200)
  async findAll(@Res() res: Response) {
    const comments = await this.commentService.findAll();

    response.success(res, comments);
  }

  @Post('/set')
  @HttpCode(201)
  async setComment(
    @Res() res: Response,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const comment = await this.commentService.save(createCommentDto);
    // return comment;
    response.success(res, comment);
  }

  @Patch('/update/:commentId')
  @HttpCode(201)
  async updateOne(
    @Param('commentId') commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<string> {
    await this.commentService.updateOne(commentId, updateCommentDto);

    return 'success';
  }

  @Delete('/delete/:commentId')
  @HttpCode(201)
  async deleteOne(
    @Res() res: Response,
    @Param('commentId') commentId: number,
    @Body() deleteCommentDto: DeleteCommentDto,
  ) {
    const comment = await this.commentService.deleteOne(deleteCommentDto);

    response.success(res, comment);
  }
}
