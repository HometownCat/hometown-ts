import { BoardImage } from './boardImage.entity';
import { BoardLike } from './boardLike.entity';
import { BoardComment } from './boardComment.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'board' })
export class Board {
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

  @OneToMany(() => BoardComment, (boardComments) => boardComments.board)
  boardComment: BoardComment[];

  @OneToOne(() => BoardLike, (boardLikes) => boardLikes.board)
  boardLike: BoardLike;

  @OneToMany(() => BoardImage, (boardImages) => boardImages.board)
  boardImage: BoardImage[];
}
