import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.login || initialState;

export const selectSubmitting = createSelector(
  [selectDomain],
  loginState => loginState.submitting,
);

export const selectError = createSelector(
  [selectDomain],
  loginState => loginState.error,
);
