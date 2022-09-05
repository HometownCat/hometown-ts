import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Board } from './board.entity';

@Entity({ name: 'boardLike' })
export class BoardLike {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'tinyint', default: 0, name: 'like', nullable: false })
  like: string;

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

  @OneToOne(() => BoardLike, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'boardId', referencedColumnName: 'id' })
  board: BoardLike;

  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
