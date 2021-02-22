import { Article } from 'types/Article';

/* --- STATE --- */
export interface ArticleState {
  articleId: string | null;
  loading: boolean;
  error?: ArticleErrorType | null;
  article: Article | null;
}

export enum ArticleErrorType {
  RESPONSE_ERROR = 1,
}

export type ContainerState = ArticleState;
