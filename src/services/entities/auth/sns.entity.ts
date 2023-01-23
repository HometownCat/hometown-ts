import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'userSns' })
export class UserSns {
  @PrimaryColumn({ type: 'varchar', name: 'snsId' })
  snsId: string;

  @Column({ type: 'varchar', name: 'provider', nullable: false })
  provider: string;

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
