import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../entities/category/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {}
