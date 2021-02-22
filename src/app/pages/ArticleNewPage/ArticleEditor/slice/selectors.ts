import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.articleNew || initialState;

export const selectPublishing = createSelector(
  [selectDomain],
  articleNewState => articleNewState.publishing,
);

export const selectError = createSelector(
  [selectDomain],
  articleNewState => articleNewState.error,
);
