import { Injectable } from '@nestjs/common';
import { Board } from 'src/services/entities/board/board.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async viewCountIncrease(boardId: number): Promise<void> {
    await this.createQueryBuilder('board')
      .update(Board)
      .set({
        viewCount: () => 'viewCount + 1',
      })
      .where('id = :id', { id: boardId })
      .execute();
  }
  async getOneById(boardId: number): Promise<Board> {
    const board = await this.createQueryBuilder('board')
      .where('board.id = (:boardId)', { boardId })
      .getOne();
    return board;
  }
}
