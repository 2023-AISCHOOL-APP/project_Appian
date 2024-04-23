import { PickType } from '@nestjs/swagger';
import { Content } from '../entities/content.entity';

export class WriteContent extends PickType(Content, [
  'content_title',
  'contents',
]) {
  user_nick: string;
}

export class DeletedContentInput {
  content_num: number;
}

export class WriteOrReadComment {
  user_nick: string;
  content_num: number;
  content_comment?: string; // 댓글 쓰는건지 읽는건지 구분
}
