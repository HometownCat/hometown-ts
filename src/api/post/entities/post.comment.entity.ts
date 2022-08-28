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
import { Post } from './post.entity';

@Entity({ name: 'postComment' })
export class PostComment {
  @PrimaryGeneratedColumn()
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

  @ManyToOne(() => Post, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: Post;
}
