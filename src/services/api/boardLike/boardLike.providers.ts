import { BoardLike } from '@Src/services/entities/board/boardLike.entity';
import { DataSource } from 'typeorm';

export const BoardLikeProviders = [
  {
    provide: 'BOARDLIKE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(BoardLike),
    inject: ['DATA_SOURCE'],
  },
];
