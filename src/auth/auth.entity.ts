import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'auth' })
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', name: 'accessToken', nullable: true })
  accessToken: string;

  @Column({ type: 'text', name: 'revokeToken', nullable: true })
  revokeToken: string;

  @Column({ type: 'text', name: 'oauth_token', nullable: true })
  oauth_token: string;

  @Column({ type: 'text', name: 'oauth_verifier', nullable: true })
  oauth_verifier: string;

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
