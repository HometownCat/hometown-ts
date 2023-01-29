import HttpError from '@Src/common/exceptions/http.exception';
import { HttpMessage } from '@Src/common/utils/errors/http-message.enum';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Board } from 'src/services/entities/board/board.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async viewCountIncrease(boardId: number): Promise<void> {
    try {
      await this.createQueryBuilder('board')
        .update(Board)
        .set({
          viewCount: () => 'viewCount + 1',
        })
        .where('id = :id', { id: boardId })
        .execute();
    } catch (err) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        HttpMessage.UPDATE_FAIL,
      );
    }
  }
  async getOneById(boardId: number, userId: number): Promise<Board> {
    return this.createQueryBuilder('board')
      .leftJoinAndSelect('board.boardImage', 'boardImage')
      .leftJoinAndSelect('board.boardComment', 'boardComment')
      .leftJoinAndSelect('board.boardLike', 'boardLike')
      .where('board.id = (:id)', { id: boardId })
      .andWhere('board.userId = (:userId)', { userId: userId })
      .getOne();
    // .then(result => {
    //   if (result === null)
    //     throw new HttpError(
    //       HttpStatus.NOT_FOUND,
    //       HttpMessage.NOT_FOUND_BOARD,
    //     );

    //   const { boardLike, id: boardId } = result;

    //   if (boardLike.length === 0) {
    //     this.boardLikeRepository
    //       .save({ boardId, userId })
    //       .then(saveData => {
    //         let { boardId, userId, id } = saveData;
    //         boardId = +boardId;
    //         userId = +userId;
    //         id = +id;
    //         const returnData = {
    //           ...result,
    //           boardLike: { ...saveData, boardId, userId, id },
    //         };
    //         callback(null, returnData);
    //       })
    //       .catch(err => {
    //         console.log(err);

    //         callback(err);
    //       });
    //   } else {
    //     callback(null, result);
    //   }
    // })
    // .catch(err => {
    //   console.log(err);

    //   callback(err);
    // });
  }
}
