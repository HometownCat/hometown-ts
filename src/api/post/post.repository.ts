import { PostEntity } from './entities/post.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async getOneById(postId: number): Promise<PostEntity> {
    const post = await this.createQueryBuilder('post')
      .leftJoinAndSelect('post.postComment', 'postComment')
      .leftJoinAndSelect('post.postImage', 'postImage')
      .leftJoinAndSelect('post.postLike', 'postLike')
      .where('post.id = (:postId)', { postId })
      .getOne();

    return post;
  }
}
