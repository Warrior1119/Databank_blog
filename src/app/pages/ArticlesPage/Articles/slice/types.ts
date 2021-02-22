import { Article } from 'types/Article';

/* --- STATE --- */
export interface ArticlesState {
  loading: boolean;
  error?: ArticlesErrorType | null;
  articles: Article[];
}

export enum ArticlesErrorType {
  RESPONSE_ERROR = 1,
}

export type ContainerState = ArticlesState;
