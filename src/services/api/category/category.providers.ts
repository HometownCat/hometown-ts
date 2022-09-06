import { Category } from '@Src/services/entities/category/category.entity';
import { DataSource } from 'typeorm';

export const CategoryProviders = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: ['DATA_SOURCE'],
  },
];
