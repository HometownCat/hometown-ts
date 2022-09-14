import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateBoardDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  // @IsNumber()
  // viewCount: number;

  // @IsNumber()
  // likeCount: number;

  // @IsNumber()
  // commentCount: number;

  // @IsNumber()
  // likeStatus: number;

  // @IsDateString()
  // createdAt: Date;

  // @IsDateString()
  // updatedAt: Date;

  @IsNumber()
  userId: number;
}
