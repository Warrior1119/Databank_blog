import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.articles || initialState;

export const selectLoading = createSelector(
  [selectDomain],
  articlesState => articlesState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  articlesState => articlesState.error,
);

export const selectArticles = createSelector(
  [selectDomain],
  articlesState => articlesState.articles,
);
