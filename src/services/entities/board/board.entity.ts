import { BoardImage } from './boardImage.entity';
import { BoardComment } from './boardComment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { BoardLike } from './boardLike.entity';

@Entity({ name: 'board' })
export class Board {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'text', name: 'title', nullable: false })
  title: string;

  @Column({ type: 'mediumtext', name: 'content', nullable: false })
  content: string;

  @Column({ type: 'mediumint', name: 'viewCount', default: 0 })
  viewCount: number;

  @Column({ type: 'mediumint', name: 'commentCount', default: 0 })
  commentCount: number;

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

  @ManyToOne(() => User, {
    createForeignKeyConstraints: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  userId: number;

  @OneToMany(() => BoardComment, boardComments => boardComments.boardId, {
    cascade: true,
  })
  boardComment: BoardComment[];

  @OneToMany(() => BoardImage, boardImages => boardImages.boardId, {
    cascade: true,
  })
  boardImage: BoardImage[];

  @OneToMany(() => BoardLike, boardLikes => boardLikes.boardId, {
    cascade: true,
  })
  boardLike: BoardLike[];

  @ManyToOne(() => User, {
    createForeignKeyConstraints: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
