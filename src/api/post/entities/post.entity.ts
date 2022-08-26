import { PostImage } from './post.image.entity';
import { PostLike } from './post.like.entity';
import { PostComment } from './post.comment.entity';
import { PostContent } from './post.content.entity';
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
export class Post {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'text', name: 'title', nullable: false })
  title: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', default: null })
  updatedAt: Date;

  @OneToOne(() => PostContent, (postContent) => postContent.post)
  postContent: PostContent;

  @OneToMany(() => PostComment, (postComments) => postComments.post)
  postComment: PostComment[];

  @OneToOne(() => PostLike, (postLikes) => postLikes.post)
  postLike: PostLike;

  @OneToMany(() => PostImage, (postImage) => postImage.post)
  postImage: PostImage[];
}
