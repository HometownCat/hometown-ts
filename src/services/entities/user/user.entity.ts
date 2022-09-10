import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../board/board.entity';

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

  @Column({
    type: 'timestamp',
    name: 'updatedAt',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: null,
  })
  updatedAt: Date;

  @OneToMany(() => Board, boards => boards.user)
  board: Board[];
}
