import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@Src/database/database.module';
import { Category } from 'src/services/entities/category/category.entity';
import { CategoryController } from './category.controller';
import { CategoryProviders } from './category.providers';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository]), DatabaseModule],
  controllers: [CategoryController],
  providers: [...CategoryProviders, CategoryService],
  exports: [...CategoryProviders, CategoryService],
})
export class CategoryModule {}
