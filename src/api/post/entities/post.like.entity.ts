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
import { Post } from './post.entity';

@Entity({ name: 'postLike' })
export class PostLike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'tinyint', default: 0, name: 'like', nullable: false })
  like: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', default: null })
  updatedAt: Date;

  @OneToOne(() => Post, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: Post;
}
