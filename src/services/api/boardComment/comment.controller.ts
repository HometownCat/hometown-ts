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
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create.dto';
import * as response from '../../../common/tools/response.tool';
import { UpdateCommentDto } from './dtos/update.dto';
import { v4 as uuidV4 } from 'uuid';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('게시글 댓글')
@ApiSecurity('x-api-key')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({
    summary: '게시글 댓글 리스트',
    description: '관리자에서 각 게시글의 리스트 조회',
  })
  @ApiOkResponse({
    description: '성공',
  })
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

  @ApiOperation({
    summary: '게시글 댓글 등록',
    description: '유저가 게시글에 댓글 등록하는 API',
  })
  @ApiBody({ type: CreateCommentDto })
  @ApiOkResponse({
    description: '성공',
  })
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

  @ApiOperation({
    summary: '게시글 댓글 수정',
    description: '유저가 게시글 댓글 수정 시 사용되는 API',
  })
  @ApiBody({ type: UpdateCommentDto })
  @ApiQuery({
    name: 'commentId',
    required: true,
    type: Number,
  })
  @ApiOkResponse({
    description: '성공',
  })
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

  @ApiOperation({
    summary: '게시글 댓글 삭제',
    description: '유저가 게시글 댓글 삭제 시 사용되는 API',
  })
  @ApiQuery({
    name: 'commentId',
    required: true,
    type: Number,
  })
  @ApiOkResponse({
    description: '성공',
  })
  @Delete('/delete/:commentId')
  @HttpCode(201)
  async deleteOne(
    @Res() res: Response,
    @Param('commentId') commentId: number,
    @Body() deleteCommentDto: DeleteCommentDto,
  ) {
    await this.commentService.deleteOne(commentId, deleteCommentDto);

    response.success(res, { message: 'delete success' });
  }
}
