import { IsNumber } from 'class-validator';

export class UpdateLikeDto {
  @IsNumber()
  like: number;

  @IsNumber()
  boardId: number;

  @IsNumber()
  userId: number;
}
