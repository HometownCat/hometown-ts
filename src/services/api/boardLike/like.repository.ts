import { BoardLike } from '@Src/services/entities/board/boardLike.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(BoardLike)
export class LikeRepository {}
