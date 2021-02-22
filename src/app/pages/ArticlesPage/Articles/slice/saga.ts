import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { articlesActions as actions } from '.';
import { Article } from 'types/Article';
import { ArticlesErrorType } from './types';
import { API_BASE_URL } from 'config';
/**
 * Github repos request/response handler
 */
export function* getArticles() {
  const requestURL = `${API_BASE_URL}/articles`;
  try {
    // Call our request helper (see 'utils/request')
    const articles: Article[] = yield call(request, requestURL);
    yield put(actions.articlesLoaded(articles));
  } catch (err) {
    yield put(actions.articlesError(ArticlesErrorType.RESPONSE_ERROR));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* articlesSaga() {
  yield takeLatest(actions.loadArticles.type, getArticles);
}
