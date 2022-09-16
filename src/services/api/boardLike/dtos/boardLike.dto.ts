import { IsNumber } from 'class-validator';

export class BoardLikeDto {
  @IsNumber()
  id: number;

  @IsNumber()
  likeCount: number;

  @IsNumber()
  likeStatus: number;

  @IsNumber()
  boardId: number;

  @IsNumber()
  userId: number;
}
