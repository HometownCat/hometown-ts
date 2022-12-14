import { Board } from 'src/services/entities/board/board.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async getOneById(boardId: number): Promise<Board> {
    const board = await this.createQueryBuilder('board')
      .where('board.id = (:boardId)', { boardId })
      .getOne();
    return board;
  }
}
