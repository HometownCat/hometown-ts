import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'snsToken' })
export class SnsToken {
  @PrimaryGeneratedColumn({ type: 'int', name: 'snsId' })
  snsId: number;

  @Column({ type: 'text', name: 'accessToken', nullable: true })
  accessToken: string;

  @Column({ type: 'text', name: 'revokeToken', nullable: true })
  revokeToken: string;

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
}
