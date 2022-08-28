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

@Entity({ name: 'postImage' })
export class PostImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', name: 'image', nullable: true })
  image: string;

  @Column({ type: 'text', name: 'jpeg', nullable: true })
  jpeg: string;

  @Column({ type: 'text', nullable: true })
  webp: string;

  @Column({ type: 'text', nullable: true })
  original: string;

  @Column({ type: 'text', nullable: true })
  jpegBucket: string;

  @Column({ type: 'text', nullable: true })
  webpBucket: string;

  @Column({ type: 'text', nullable: true })
  originalBucket: string;

  @Column({ type: 'mediumint', nullable: true })
  width: number;

  @Column({ type: 'mediumint', nullable: true })
  heigth: number;

  @Column({ type: 'mediumint', nullable: true })
  filesizeJpeg: number;

  @Column({ type: 'mediumint', nullable: true })
  filesizeWebp: number;

  @Column({ type: 'tinyint', nullable: true })
  order: number;

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
