import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { authActions } from 'app/slices';
import { registerActions as actions } from '.';
import { Auth } from 'types/Auth';
import { RegisterErrorType } from './types';
import { API_BASE_URL } from 'config';

export function* register(action) {
  const { form, history } = action.payload;
  const requestURL = `${API_BASE_URL}/register`;

  try {
    const auth: Auth = yield call(request, requestURL, {
      body: form,
      method: 'POST',
    });
    yield put(authActions.login(auth));
    history.push('/articles');
  } catch (err) {
    if (err.response?.status === 409) {
      yield put(actions.registerError(RegisterErrorType.DUPLICATE_EMAIL));
    } else {
      yield put(actions.registerError(RegisterErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* registerSaga() {
  yield takeLatest(actions.register.type, register);
}
