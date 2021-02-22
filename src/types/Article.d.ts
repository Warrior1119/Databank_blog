import { Author } from './Author';

export interface Article {
  id: string;
  title: string;
  content?: string;
  summary?: string;
  author: Author;
  createdAt: string;
}

export interface ArticleForm {
  title: string;
  content: string;
}
