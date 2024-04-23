import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ContentsService } from './contents.service';
import {
  DeletedContentInput,
  WriteContent,
  WriteOrReadComment,
} from './dto/contents-controller.dto';
import { Content_Comment } from '../content_comments/entities/content_comment.entity';
import { Content } from './entities/content.entity';

@Controller('community')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post('write_content') // 커뮤니티 자랑하기 글 추가
  writeContent(@Body() writeContentInput: WriteContent): Promise<Content> {
    return this.contentsService.writeContent({ writeContentInput });
  }

  @Get('content') // 커뮤니티 자랑하기 게시글들
  getContents(): Promise<Content[]> {
    return this.contentsService.getContents();
  }

  @Get('delete') // 게시물 삭제
  deleteContent(
    @Query() deletedContentInput: DeletedContentInput,
  ): Promise<boolean> {
    return this.contentsService.deletedContent({ deletedContentInput });
  }

  @Get('content_comment') // 댓글 읽거는데 쓰기도함
  writeOrReadComment(
    @Query() writeOrReadComment: WriteOrReadComment,
  ): Promise<Content_Comment[]> {
    return this.contentsService.readComments({ writeOrReadComment });
  }
}
