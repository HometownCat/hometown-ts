import { UpdateLikeDto } from './dtos/update.dto';
import { Get, Inject, Injectable, Post } from '@nestjs/common';
import { BoardLike } from '@Src/services/entities/board/boardLike.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
  constructor(
    @Inject('LIKE_REPOSITORY')
    private commentRepository: Repository<BoardLike>,
  ) {}

  // like up
  async upLike(updateLikeDto: UpdateLikeDto) {
    // like find 필요
    //   const like = await this.commentRepository.update({
    //     set: { like: addLike + 1 },
    //   });
    //   return like;
  }

  // like down
  async downLike(updateLikeDto: UpdateLikeDto) {
    // like find 필요
    //   const like = await this.commentRepository.update({
    //     set: { like: addLike - 1 },
    //   });
    //   return like;
  }
}
