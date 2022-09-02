import { Post } from './entities/post.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async getOneById(postId: number): Promise<Post> {
    const post = await this.createQueryBuilder('post')
      .leftJoinAndSelect('post.postContent', 'postContent')
      .leftJoinAndSelect('post.postComment', 'postComment')
      .leftJoinAndSelect('post.postImage', 'postImage')
      .leftJoinAndSelect('post.postLike', 'postLike')
      .where('post.id = (:postId)', { postId })
      .getOne();

    return post;
  }
}
