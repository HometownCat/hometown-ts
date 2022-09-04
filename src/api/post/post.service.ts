import { HttpStatus, Injectable } from '@nestjs/common';
import HttpError from 'src/common/exceptions/http.exception';
import { CreatePostDto } from './dtos/create.dto';
import { PostRepository } from './post.repository';
import { HttpMessage } from 'src/common/utils/errors/http-message.enum';
import { PostEntity } from '../entities/post/post.entity';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async findOne(postId: number): Promise<PostEntity> {
    const post = await this.postRepository.getOneById(postId);

    if (post === undefined)
      throw new HttpError(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND_POST);
    return post;
  }

  async findAll(): Promise<PostEntity[]> {
    const posts = await this.postRepository.find();
    if (posts === undefined)
      throw new HttpError(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND_POST);

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
