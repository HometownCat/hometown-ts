import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: null,
  })
  updatedAt: Date;

  @ManyToOne(() => Post, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'postId', referencedColumnName: 'postId' })
  postId: Post;
}
