import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';

@EntityRepository()
export class CategoryRepository extends Repository<Category> {}
