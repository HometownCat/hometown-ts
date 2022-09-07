import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from './board.entity';

@Entity({ name: 'boardComment' })
export class BoardComment {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'text', name: 'comment', nullable: false })
  comment: string;

  @Column({
    type: 'timestamp',
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    name: 'updatedAt',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: null,
  })
  updatedAt: Date;

  @ManyToOne(() => Board, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'boardId', referencedColumnName: 'id' })
  boardId: Board;
}
