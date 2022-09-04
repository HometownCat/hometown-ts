import { PostImage } from './postImage.entity';
import { PostLike } from './postLike.entity';
import { PostComment } from './postComment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'post' })
export class PostEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'text', name: 'title', nullable: false })
  title: string;

  @Column({ type: 'mediumtext', name: 'content', nullable: false })
  content: string;

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

  @OneToMany(() => PostComment, (postComments) => postComments.post)
  postComment: PostComment[];

  @OneToOne(() => PostLike, (postLikes) => postLikes.post)
  postLike: PostLike;

  @OneToMany(() => PostImage, (postImage) => postImage.post)
  postImage: PostImage[];
}
