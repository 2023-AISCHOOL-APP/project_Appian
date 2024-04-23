import { Module } from '@nestjs/common';
import { ContentsController } from './contentes.controller';
import { ContentsService } from './contents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Content_Comment } from '../content_comments/entities/content_comment.entity';
import { Content_CommentSerivce } from '../content_comments/content_comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Content, Content_Comment])],
  controllers: [ContentsController],
  providers: [ContentsService, Content_CommentSerivce],
})
export class ContentsModule {}
