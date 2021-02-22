import { Author } from './Author';

export interface Comment {
  id: string;
  content: string;
  author: Author;
  articleId?: string;
  createdAt: string;
}

export interface CommentForm {
  content: string;
}
