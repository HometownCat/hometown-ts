import { IsDateString, IsNumber, IsString } from 'class-validator';

export class BoardDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  viewCount: number;

  @IsNumber()
  likeCount: number;

  @IsNumber()
  commentCount: number;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  boardLikeId: number;
}
