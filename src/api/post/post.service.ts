import { HttpStatus, Injectable } from '@nestjs/common';
import HttpError from 'src/common/exceptions/http.exception';
import { CreatePostDto } from './dtos/create.dto';
import { PostEntity } from './entities/post.entity';
import { PostRepository } from './post.repository';
import { HttpMessage } from 'src/common/utils/errors/http-message.enum';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async findOne(postId: number): Promise<PostEntity> {
    const post = await this.postRepository.getOneById(postId);
    return post;
  }

  async findAll(): Promise<PostEntity[]> {
    const posts = await this.postRepository.find();
    return posts;
  }

  async save(createPostDto: CreatePostDto): Promise<PostEntity> {
    let post = new PostEntity();

    post = { ...createPostDto, ...post };

    try {
      post = await this.postRepository.save(post);
    } catch (err) {
      throw new HttpError(HttpStatus.BAD_REQUEST, HttpMessage.FAIL_SAVE_POST);
    }
    return post;
  }
}
