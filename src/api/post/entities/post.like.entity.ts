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

@Entity({ name: 'postLike' })
export class postComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'tinyint', default: 0, name: 'like', nullable: false })
  like: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: null,
  })
  updatedAt: Date;

  @ManyToOne(() => Post, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'id', referencedColumnName: 'postId' })
  postId: Post;
}
