import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
