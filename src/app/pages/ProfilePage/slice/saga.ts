import { call, put, takeLatest, select } from 'redux-saga/effects';
import { request } from 'utils/request';
import { authActions } from 'app/slices';
import { profileActions as actions } from '.';
import { Auth } from 'types/Auth';
import { Author } from 'types/User';
import { ProfileErrorType } from './types';
import { API_BASE_URL } from 'config';
import { selectToken, selectLoggedIn } from 'app/slices/selectors';

export function* updateProfile(action) {
  const { form } = action.payload;
  const requestURL = `${API_BASE_URL}/profile`;
  const token = yield select(selectToken);
  const loggedIn = yield select(selectLoggedIn);
  if (loggedIn && token) {
    try {
      const updated: Author = yield call(request, requestURL, {
        body: form,
        headers: { authorization: token },
        method: 'PUT',
      });
      const newAuth: Auth = {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        avatar: updated.avatar,
        token: token,
      };

      yield put(authActions.login(newAuth));
    } catch (err) {
      if (err.response?.status === 409) {
        yield put(actions.profileError(ProfileErrorType.DUPLICATE_EMAIL));
      } else {
        yield put(actions.profileError(ProfileErrorType.RESPONSE_ERROR));
      }
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* profileSaga() {
  yield takeLatest(actions.updateProfile.type, updateProfile);
}
