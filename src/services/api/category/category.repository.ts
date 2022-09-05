import { Category } from 'src/services/entities/category/category.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {}
