import { Inject, Injectable } from '@nestjs/common';
import { Category } from 'src/services/entities/category/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {}
  async findAll(): Promise<Category[]> {
    const categorys = await this.categoryRepository.find();
    return categorys;
  }
}
