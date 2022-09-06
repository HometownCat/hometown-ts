import { BoardLike } from '@Src/services/entities/board/boardLike.entity';
import { DataSource } from 'typeorm';

export const LikeProviders = [
  {
    provide: 'LIKE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(BoardLike),
    inject: ['DATA_SOURCE'],
  },
];
