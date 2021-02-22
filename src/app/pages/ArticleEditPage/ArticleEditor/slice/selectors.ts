import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.articleEdit || initialState;

export const selectArticleId = createSelector(
  [selectDomain],
  articleEditState => articleEditState.articleId,
);

export const selectArticle = createSelector(
  [selectDomain],
  articleEditState => articleEditState.article,
);

export const selectEditing = createSelector(
  [selectDomain],
  articleEditState => articleEditState.editing,
);

export const selectLoading = createSelector(
  [selectDomain],
  articleEditState => articleEditState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  articleEditState => articleEditState.error,
);
