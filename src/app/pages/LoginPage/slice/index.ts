import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { loginSaga } from './saga';
import { LoginState, LoginErrorType } from './types';
import { LoginForm } from 'types/Auth';

export const initialState: LoginState = {
  submitting: false,
  error: null,
};

interface LoginFormWithHistory {
  history: History;
  form: LoginForm;
}

const slice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginFormWithHistory>) {
      state.submitting = true;
      console.log('login', action.payload);
    },
    loginError(state, action: PayloadAction<LoginErrorType>) {
      state.submitting = false;
      state.error = action.payload;
    },
  },
});

export const { actions: loginActions, reducer } = slice;

export const useLoginSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: loginSaga });
  return { actions: slice.actions };
};
