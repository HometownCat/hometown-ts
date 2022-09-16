import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Board } from './board.entity';

@Entity({ name: 'boardLike' })
export class BoardLike {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'likeCount', default: 0 })
  likeCount: number;

  @Column({ type: 'tinyint', name: 'likeStatus', default: 0 })
  likeStatus: number;

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
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'boardId', referencedColumnName: 'id' })
  boardId: number;

  @ManyToOne(() => User, {
    createForeignKeyConstraints: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  userId: number;
}
