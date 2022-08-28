import { Controller, Get, HttpCode } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/all')
  @HttpCode(200)
  async findAll(): Promise<Post[]> {
    const posts = await this.postService.findAll();
    return posts;
  }
}
