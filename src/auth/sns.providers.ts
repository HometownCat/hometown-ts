import { SnsToken } from '@Src/services/entities/auth/sns.entity';
import { DataSource } from 'typeorm';

export const SnsProviders = [
  {
    provide: 'SNS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SnsToken),
    inject: ['DATA_SOURCE'],
  },
];
