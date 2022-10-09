import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @ApiProperty({ type: String, description: '댓글 내용' })
  comment: string;

  @IsNumber()
  boardId: number;

  @IsNumber()
  userId: number;
}
