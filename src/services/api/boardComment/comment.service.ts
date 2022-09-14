import { DeleteCommentDto } from './dtos/delete.dto';
import { Board } from 'src/services/entities/board/board.entity';
import { UpdateCommentDto } from './dtos/update.dto';
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
    @Inject('BOARD_REPOSITORY')
    private boardRepository: Repository<Board>,
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

  async save(createCommentDto: CreateCommentDto): Promise<BoardComment> {
    let comment = new BoardComment();
    const { boardId } = createCommentDto;
    comment = { ...createCommentDto, ...comment };

    try {
      comment = await this.commentRepository.save(comment);
      await this.boardRepository
        .createQueryBuilder()
        .update(Board)
        .set({
          commentCount: () => 'commentCount + 1',
        })
        .where('id = :boardId', { boardId: boardId })
        .execute();
    } catch (err) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        HttpMessage.FAIL_SAVE_COMMENT,
      );
    }

    return comment;
  }

  async updateOne(
    commentId: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<void> {
    let comment = await this.findOne(commentId);

    if (comment === undefined)
      throw new HttpError(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND_COMMENT);

    comment = { ...updateCommentDto, ...comment };
    try {
      await this.commentRepository.save(comment);
    } catch (err) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        HttpMessage.FAIL_UPDATE_BOARD,
      );
    }
    return;
  }

  async deleteOne(
    commentId: number,
    deleteCommentDto: DeleteCommentDto,
  ): Promise<BoardComment> {
    const { boardId } = deleteCommentDto;

    const board = await this.findOne(commentId);

    if (board === undefined)
      throw new HttpError(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND_BOARD);

    try {
      await this.commentRepository
        .createQueryBuilder()
        .delete()
        .from(BoardComment)
        .where('id = :id', { id: commentId })
        .execute();

      await this.boardRepository
        .createQueryBuilder()
        .update(Board)
        .set({
          commentCount: () => 'commentCount - 1',
        })
        .where('id = :boardId', { boardId: boardId })
        .execute();
    } catch (err) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        HttpMessage.FAIL_DELETE_COMMENT,
      );
    }

    return board;
  }
}
