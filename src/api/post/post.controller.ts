import { CreatePostDto } from './dtos/create.dto';
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { PostEntity } from './entities/post.entity';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/all')
  @HttpCode(200)
  async findAll(): Promise<PostEntity[]> {
    const posts = await this.postService.findAll();
    return posts;
  }

  @Get('/:id')
  @HttpCode(200)
  async findOnePost(@Param('id') postId: number): Promise<PostEntity> {
    const post = await this.postService.findOne(postId);
    return post;
  }

  @Post('/set')
  @HttpCode(200)
  async setPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    const post = await this.postService.save(createPostDto);
    return post;
  }
}
