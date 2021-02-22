import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.register || initialState;

export const selectSubmitting = createSelector(
  [selectDomain],
  registerState => registerState.submitting,
);

export const selectError = createSelector(
  [selectDomain],
  registerState => registerState.error,
);
