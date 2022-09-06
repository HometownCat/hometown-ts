import { BoardComment } from '@Src/services/entities/board/boardComment.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(BoardComment)
export class CommentRepository {}
