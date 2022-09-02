import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async findOne(postId: number): Promise<Post> {
    const post = await this.postRepository.getOneById(postId);
    return post;
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.postRepository.find();
    return posts;
  }
}
