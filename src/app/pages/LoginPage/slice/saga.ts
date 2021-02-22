import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { authActions } from 'app/slices';
import { loginActions as actions } from '.';
import { Auth } from 'types/Auth';
import { LoginErrorType } from './types';
import { API_BASE_URL } from 'config';

export function* login(action) {
  const { form, history } = action.payload;
  const requestURL = `${API_BASE_URL}/login`;

  try {
    const auth: Auth = yield call(request, requestURL, {
      body: form,
      method: 'POST',
    });
    yield put(authActions.login(auth));
    history.push('/articles');
  } catch (err) {
    if (err.response?.status === 403) {
      yield put(actions.loginError(LoginErrorType.INVALID_PASSWORD));
    } else {
      yield put(actions.loginError(LoginErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* loginSaga() {
  yield takeLatest(actions.login.type, login);
}
