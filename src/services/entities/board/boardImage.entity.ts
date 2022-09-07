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
import { Board } from './board.entity';

@Entity({ name: 'boardImage' })
export class BoardImage {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'text', name: 'image', nullable: true })
  image: string;

  @Column({ type: 'text', name: 'jpeg', nullable: true })
  jpeg: string;

  @Column({ type: 'text', name: 'webp', nullable: true })
  webp: string;

  @Column({ type: 'text', name: 'original', nullable: true })
  original: string;

  @Column({ type: 'text', name: 'jpegBucket', nullable: true })
  jpegBucket: string;

  @Column({ type: 'text', name: 'webpBucket', nullable: true })
  webpBucket: string;

  @Column({ type: 'text', name: 'originalBucket', nullable: true })
  originalBucket: string;

  @Column({ type: 'mediumint', name: 'width', nullable: true })
  width: number;

  @Column({ type: 'mediumint', name: 'height', nullable: true })
  heigth: number;

  @Column({ type: 'mediumint', name: 'filesizeJpeg', nullable: true })
  filesizeJpeg: number;

  @Column({ type: 'mediumint', name: 'filesizeWebp', nullable: true })
  filesizeWebp: number;

  @Column({ type: 'tinyint', name: 'order', nullable: true })
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

  @ManyToOne(() => Board, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'boardId', referencedColumnName: 'id' })
  boardId: Board;
}
