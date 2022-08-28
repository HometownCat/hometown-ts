import { CategoryService } from './category.service';
import { Controller, Get, HttpCode } from '@nestjs/common';
import { Category } from './category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  @HttpCode(200)
  async findAll(): Promise<Category[]> {
    const posts = await this.categoryService.findAll();
    return posts;
  }
}
