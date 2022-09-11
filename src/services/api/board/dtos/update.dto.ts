import { PartialType } from '@nestjs/swagger';
import { CreateBoardDto } from './create.dto';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {}
