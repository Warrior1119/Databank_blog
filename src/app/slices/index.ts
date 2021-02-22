import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { AuthState } from './types';
import { Auth } from 'types/Auth';
import { authSaga } from './saga';

let initialStoredState: AuthState = {
  loggedIn: false,
  auth: null,
};
let storedAuth = localStorage.getItem('auth');

if (storedAuth) {
  initialStoredState = JSON.parse(storedAuth);
}

export const initialState = initialStoredState;

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<Auth>) {
      console.log(action.payload);
      state.loggedIn = true;
      state.auth = action.payload;
      localStorage.setItem('auth', JSON.stringify(state));
    },
    logout(state) {
      console.log('logout');
      state.loggedIn = false;
      state.auth = null;
      localStorage.removeItem('auth');
    },
  },
});

export const { actions: authActions, reducer } = slice;

export const useAuthSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authSaga });
  return { actions: slice.actions };
};
