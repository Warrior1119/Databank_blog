import { PayloadAction } from '@reduxjs/toolkit';
import { CommentForm, Comment } from 'types/Comment';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { commentsSaga } from './saga';
import { CommentsState, CommentsErrorType } from './types';

export const initialState: CommentsState = {
  articleId: null,
  editingId: null,
  deletingId: null,
  comments: [],
  loading: false,
  creating: false,
  editing: false,
  error: null,
};

const slice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    loadComments(state, action: PayloadAction<string>) {
      state.articleId = action.payload;
      state.loading = true;
      state.error = null;
    },
    commentsLoaded(state, action: PayloadAction<Comment[]>) {
      state.loading = false;
      state.error = null;
      state.comments = action.payload;
    },
    commentsError(state, action: PayloadAction<CommentsErrorType>) {
      state.loading = false;
      state.error = action.payload;
      state.comments = [];
    },

    createComment(state, action: PayloadAction<CommentForm>) {
      state.creating = true;
    },

    selectComment(state, action: PayloadAction<string>) {
      state.editingId = action.payload;
    },

    deselectComment(state) {
      state.editingId = null;
    },

    updateComment(state, action: PayloadAction<CommentForm>) {
      state.editing = true;
    },

    deleteComment(state, action: PayloadAction<string>) {
      state.deletingId = action.payload;
    },

    commentCreated(state) {
      state.creating = false;
    },

    commentEdited(state, action: PayloadAction<Comment | null>) {
      const updated = action.payload;
      if (updated) {
        state.comments = state.comments.map(c =>
          c.id === updated.id ? updated : c,
        );
      }
    },

    commentDeleted(state) {},
  },
});

export const { actions: commentsActions, reducer } = slice;

export const useCommentsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: commentsSaga });
  return { actions: slice.actions };
};
