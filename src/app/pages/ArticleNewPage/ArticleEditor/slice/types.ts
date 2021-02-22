/* --- STATE --- */
export interface ArticleNewState {
  publishing: boolean;
  error?: ArticleNewErrorType | null;
}

export enum ArticleNewErrorType {
  RESPONSE_ERROR = 1,
}

export type ContainerState = ArticleNewState;
