import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { registerSaga } from './saga';
import { RegisterState, RegisterErrorType } from './types';
import { RegisterForm } from 'types/Auth';

export const initialState: RegisterState = {
  submitting: false,
  error: null,
};

interface RegisterFormWithHistory {
  history: History;
  form: RegisterForm;
}

const slice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    register(state, action: PayloadAction<RegisterFormWithHistory>) {
      state.submitting = true;
    },
    registerError(state, action: PayloadAction<RegisterErrorType>) {
      state.submitting = false;
      state.error = action.payload;
    },
  },
});

export const { actions: registerActions, reducer } = slice;

export const useRegisterSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: registerSaga });
  return { actions: slice.actions };
};
