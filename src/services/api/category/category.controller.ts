import { CategoryService } from './category.service';
import { Controller, Get, HttpCode, Res } from '@nestjs/common';
import { Category } from 'src/services/entities/category/category.entity';
import { Response } from 'express';
import * as response from '../../../common/tools/response.tool';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/all')
  @HttpCode(200)
  async findAll(@Res() res: Response) {
    const categorys = await this.categoryService.findAll();
    // return categorys;
    response.success(res, categorys);
  }
}
