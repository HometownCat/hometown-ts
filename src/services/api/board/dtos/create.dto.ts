import { IsArray, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  viewCount: number;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}