import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category/category.entity';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async findAll(): Promise<Category[]> {
    const categorys = await this.categoryRepository.find();
    return categorys;
  }
}
