import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { BoardComment } from '@Src/services/entities/board/boardComment.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/register')
  @HttpCode(201)
  async setComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<BoardComment> {
    const comment = await this.commentService.setComment(createCommentDto);
    return comment;
  }
}
