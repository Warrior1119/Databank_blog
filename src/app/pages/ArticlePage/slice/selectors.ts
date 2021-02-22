import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.article || initialState;

export const selectArticleId = createSelector(
  [selectDomain],
  articleState => articleState.articleId,
);

export const selectLoading = createSelector(
  [selectDomain],
  articleState => articleState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  articleState => articleState.error,
);

export const selectArticle = createSelector(
  [selectDomain],
  articleState => articleState.article,
);
