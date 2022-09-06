import { BoardComment } from '@Src/services/entities/board/boardComment.entity';
import { DataSource } from 'typeorm';

export const CommentProviders = [
  {
    provide: 'COMMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(BoardComment),
    inject: ['DATA_SOURCE'],
  },
];
