import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  comment: string;

  @IsNumber()
  boardId: number;

  @IsNumber()
  userId: number;
}
