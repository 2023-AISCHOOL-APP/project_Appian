export class WriteContent {
  user_nick: string;
  content_title: string;
  contents: string;
}

export class DeletedContentInput {
  content_num: number;
}

export class WriteOrReadComment {
  user_nick: string;
  content_num: number;
  content_comment?: string;
}
