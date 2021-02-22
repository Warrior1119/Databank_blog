import { call, put, takeLatest, select } from 'redux-saga/effects';
import { request } from 'utils/request';
import { articlesActions } from 'app/pages/ArticlesPage/Articles/slice';
import { articleActions as actions } from '.';
import { ArticleNewErrorType } from './types';
import { API_BASE_URL } from 'config';
import { selectLoggedIn, selectToken } from 'app/slices/selectors';
/**
 * Github repos request/response handler
 */
export function* createArticle(action) {
  const { articleForm, history } = action.payload;
  const requestURL = `${API_BASE_URL}/articles`;
  const loggedIn = yield select(selectLoggedIn);
  const token = yield select(selectToken);

  if (loggedIn && token) {
    try {
      // Call our request helper (see 'utils/request')
      yield call(request, requestURL, {
        body: articleForm,
        headers: { authorization: token },
        method: 'POST',
      });
      yield put(actions.articleCreated());
      yield put(articlesActions.loadArticles());
      history.push('/articles');
    } catch (err) {
      yield put(actions.articleNewError(ArticleNewErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* articleNewSaga() {
  yield takeLatest(actions.createArticle.type, createArticle);
}
