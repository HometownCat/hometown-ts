import { IsDateString, IsNumber } from 'class-validator';

export class BoardLikeDto {
  @IsNumber()
  id: number;

  @IsNumber()
  likeStatus: number;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;

  @IsNumber()
  boardId: number;

  @IsNumber()
  userId: number;
}
