import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from 'src/services/entities/category/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category, 'hometown')
    private readonly categoryRepository: CategoryRepository,
  ) {}
  async findAll(): Promise<Category[]> {
    const categorys = await this.categoryRepository.find();
    return categorys;
  }
}
