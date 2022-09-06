import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "@Src/database/database.module";
import { CommentProviders } from "./comment.providers";
import { CommentRepository } from "./comment.repository";
import { CommentService } from "./comment.service";

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository]), DatabaseModule],
  controllers: [CommentRepository],
  providers: [...CommentProviders, CommentService],
  exports: [...CommentProviders, CommentService],
})
export class CommentModule {}
