import { EntityRepository, Repository } from 'typeorm';
import { PostEntity } from '../entities/post/post.entity';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async getOneById(postId: number): Promise<PostEntity> {
    const post = await this.createQueryBuilder('post')
      .where('post.id = (:postId)', { postId })
      .getOne();
    console.log(post);
    return post;
  }
}
