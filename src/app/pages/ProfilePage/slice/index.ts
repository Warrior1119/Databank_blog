import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { profileSaga } from './saga';
import { ProfileState, ProfileErrorType } from './types';
import { ProfileForm } from 'types/Auth';

export const initialState: ProfileState = {
  submitting: false,
  success: true,
  error: null,
};

interface ProfileFormWithHistory {
  history: History;
  form: ProfileForm;
}

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile(state, action: PayloadAction<ProfileFormWithHistory>) {
      state.submitting = true;
    },
    profileUpdated(state) {
      state.submitting = false;
      state.success = true;
      state.error = null;
    },
    profileError(state, action: PayloadAction<ProfileErrorType>) {
      state.submitting = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const { actions: profileActions, reducer } = slice;

export const useProfileSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: profileSaga });
  return { actions: slice.actions };
};
