import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.auth || initialState;

export const selectLoggedIn = createSelector(
  [selectDomain],
  authState => authState.loggedIn,
);

export const selectToken = createSelector(
  [selectDomain],
  authState => authState.auth?.token,
);

export const selectUserId = createSelector(
  [selectDomain],
  authState => authState.auth?.id,
);

export const selectName = createSelector(
  [selectDomain],
  authState => authState.auth?.name,
);

export const selectEmail = createSelector(
  [selectDomain],
  authState => authState.auth?.email,
);

export const selectAvatar = createSelector(
  [selectDomain],
  authState => authState.auth?.avatar,
);
