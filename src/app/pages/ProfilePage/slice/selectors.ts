import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.profile || initialState;

export const selectSubmitting = createSelector(
  [selectDomain],
  profileState => profileState.submitting,
);

export const selectError = createSelector(
  [selectDomain],
  profileState => profileState.error,
);

export const selectSuccess = createSelector(
  [selectDomain],
  profileState => profileState.success,
);
