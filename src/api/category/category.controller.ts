import { CategoryService } from './category.service';
import { Controller, Get, HttpCode } from '@nestjs/common';
import { Category } from '../entities/category/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('/all')
  @HttpCode(200)
  async findAll(): Promise<Category[]> {
    const categorys = await this.categoryService.findAll();
    return categorys;
  }
}
