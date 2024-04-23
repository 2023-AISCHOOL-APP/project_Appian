import {
  DeletedContentInput,
  WriteContent,
  WriteOrReadComment,
} from '../dto/contents-controller.dto';

export interface IContentServiceWriteContent {
  writeContentInput: WriteContent;
}

export interface IContentServiceDeletedContent {
  deletedContentInput: DeletedContentInput;
}

export interface IContentServiceWriteOrReadComment {
  writeOrReadComment: WriteOrReadComment;
}
