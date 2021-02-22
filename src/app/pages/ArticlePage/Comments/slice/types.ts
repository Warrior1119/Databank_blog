import { Comment } from 'types/Comment';

/* --- STATE --- */
export interface CommentsState {
  articleId: string | null;
  editingId: string | null;
  deletingId: string | null;
  loading: boolean;
  creating: boolean;
  editing: boolean;
  error?: CommentsErrorType | null;
  comments: Comment[];
}

export enum CommentsErrorType {
  RESPONSE_ERROR = 1,
}

export type ContainerState = CommentsState;
