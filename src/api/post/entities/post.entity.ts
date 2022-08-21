import { PostLike } from './post.like.entity';
import { PostComment } from './post.comment.entity';
import { PostContent } from './post.content.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'post' })
export class Post {
  @PrimaryGeneratedColumn({ type: 'int', name: 'postId' })
  id: number;

  @Column({ type: 'text', name: 'title', nullable: false })
  title: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: null,
  })
  updatedAt: Date;

  @OneToMany(() => PostContent, (postContents) => postContents.postId)
  postContent: PostContent;

  @OneToMany(() => PostComment, (postComments) => postComments.postId)
  postComment: PostComment;

  @OneToMany(() => PostLike, (postLikes) => postLikes.postId)
  postLike: PostLike;
}
