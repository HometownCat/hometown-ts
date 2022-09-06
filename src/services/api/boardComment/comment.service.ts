import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import HttpError from '@Src/common/exceptions/http.exception';
import { HttpMessage } from '@Src/common/utils/errors/http-message.enum';
import { BoardComment } from '@Src/services/entities/board/boardComment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dtos/create.dto';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<BoardComment>,
  ) {}
  async findOne(commentId: number): Promise<BoardComment> {
    // select * from Comment where id = ?
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (comment === undefined)
      throw new HttpError(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND_COMMENT);
    return comment;
  }

  async findAll(): Promise<BoardComment[]> {
    // select * from Comment
    const Comments = await this.commentRepository.find();
    if (Comments === undefined)
      throw new HttpError(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND_COMMENT);

    return Comments;
  }

  async setComment(createCommentDto: CreateCommentDto): Promise<BoardComment> {
    let comment = new BoardComment();

    comment = { ...createCommentDto, ...comment };

    try {
      comment = await this.commentRepository.save(comment);
    } catch (err) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        HttpMessage.FAIL_SAVE_COMMENT,
      );
    }

    return comment;
  }
}
