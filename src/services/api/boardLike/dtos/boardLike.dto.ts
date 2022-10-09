import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';

export class BoardLikeDto {
  @IsNumber()
  id: number;

  @IsNumber()
  @ApiProperty({ type: Number, description: '좋아요 상태' })
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
