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
import { v4 as uuidV4 } from 'uuid';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/list')
  @HttpCode(200)
  async findAll(@Res() res: Response) {
    const comments = await this.commentService.findAll();
    if (comments.length > 0) {
      response.success(res, comments);
    } else {
      return { uuid: uuidV4(), data: [] };
    }
  }

  @Post('/set')
  @HttpCode(201)
  async setComment(
    @Res() res: Response,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    await this.commentService.save(createCommentDto);
    // return comment;
    response.success(res, { message: 'insert success' });
  }

  @Patch('/update/:commentId')
  @HttpCode(201)
  async updateOne(
    @Res() res: Response,
    @Param('commentId') commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    await this.commentService.updateOne(commentId, updateCommentDto);

    response.success(res, { message: 'update success' });
  }

  @Delete('/delete/:commentId')
  @HttpCode(201)
  async deleteOne(
    @Res() res: Response,
    @Param('commentId') commentId: number,
    @Body() deleteCommentDto: DeleteCommentDto,
  ) {
    /*
    {
        "boardId": 1
    }
    */
    await this.commentService.deleteOne(commentId, deleteCommentDto);

    response.success(res, { message: 'delete success' });
  }
}
