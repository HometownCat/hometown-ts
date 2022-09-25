import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../board/board.entity';
import { BoardLike } from '../board/boardLike.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'username', length: 20, nullable: false })
  username: string;

  @Column({ type: 'mediumtext', name: 'email', nullable: false })
  email: string;

  @Column({
    select: false,
    type: 'varchar',
    name: 'password',
    length: 20,
    nullable: false,
  })
  password: string;

  @Column({ type: 'mediumtext', name: 'address' })
  address: string;

  @Column({ type: 'varchar', name: 'phoneNumber' })
  phoneNumber: string;

  @Column({ type: 'text', name: 'profileImage' })
  profileImage: string;

  @Column({ type: 'varchar', name: 'userIp', length: 20, nullable: false })
  userIp: string;

  @Column({ type: 'tinyint', name: 'status', nullable: false })
  status: number;

  @Column({
    type: 'timestamp',
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  // @Column()
  // accessToken: string;

  // @Column()
  // revokeToken: string;

  @Column({
    type: 'timestamp',
    name: 'updatedAt',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: null,
  })
  updatedAt: Date;

  @OneToMany(() => Board, boards => boards.user)
  board: Board[];

  @OneToMany(() => BoardLike, boardLikes => boardLikes.boardId)
  boardLike: BoardLike[];
}
