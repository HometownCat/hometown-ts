import { BoardImage } from './boardImage.entity';
import { BoardComment } from './boardComment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

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

  @OneToMany(() => BoardComment, boardComments => boardComments.board)
  boardComment: BoardComment[];

  @OneToMany(() => BoardImage, boardImages => boardImages.board)
  boardImage: BoardImage[];

  @ManyToOne(() => User, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
