import { Category } from 'src/services/entities/category/category.entity';
import { Board } from 'src/services/entities/board/board.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'boardCategory' })
export class BoardCategory {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @ManyToOne(() => Board, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'boardId', referencedColumnName: 'id' })
  boardId: number;

  @ManyToOne(() => Category, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'categoryId', referencedColumnName: 'id' })
  categoryId: number;
}
