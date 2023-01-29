import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @ApiProperty({
    example: '게시글입니다',
    type: String,
    description: '게시글 제목',
    required: true,
  })
  title: string;

  @IsString()
  @ApiProperty({
    example: '게시글 내용입니다',
    type: String,
    description: '게시글 내용',
    required: true,
  })
  content: string;

  @IsNumber()
  viewCount: number;

  @IsNumber()
  likeCount: number;

  @IsNumber()
  commentCount: number;

  @IsNumber()
  userId: number;
}
