import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.comments || initialState;

export const selectArticleId = createSelector(
  [selectDomain],
  commentsState => commentsState.articleId,
);

export const selectLoading = createSelector(
  [selectDomain],
  commentsState => commentsState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  commentsState => commentsState.error,
);

export const selectComments = createSelector(
  [selectDomain],
  commentsState => commentsState.comments,
);

export const selectCreating = createSelector(
  [selectDomain],
  commentsState => commentsState.creating,
);

export const selectEditing = createSelector(
  [selectDomain],
  commentsState => commentsState.editing,
);

export const selectEditingId = createSelector(
  [selectDomain],
  commentsState => commentsState.editingId,
);

export const selectDeletingId = createSelector(
  [selectDomain],
  commentsState => commentsState.deletingId,
);
