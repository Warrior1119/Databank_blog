import { Article } from 'types/Article';

/* --- STATE --- */
export interface ArticleEditState {
  articleId: string | null;
  article: Article | null;
  loading: boolean;
  editing: boolean;
  error?: ArticleEditErrorType | null;
}

export enum ArticleEditErrorType {
  RESPONSE_ERROR = 1,
}

export type ContainerState = ArticleEditState;
