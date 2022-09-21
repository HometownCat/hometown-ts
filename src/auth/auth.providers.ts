import { Auth } from '@Src/services/entities/auth/auth.entity';
import { DataSource } from 'typeorm';

export const AuthProviders = [
  {
    provide: 'AUTH_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Auth),
    inject: ['DATA_SOURCE'],
  },
];
