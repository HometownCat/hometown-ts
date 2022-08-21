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

@Entity({ name: 'postContent' })
export class PostContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext', nullable: false, name: 'content' })
  content: string;

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
