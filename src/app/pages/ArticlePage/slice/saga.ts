import { call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { selectArticleId } from './selectors';
import { articleActions as actions } from '.';
import { Article } from 'types/Article';
import { ArticleErrorType } from './types';
import { API_BASE_URL } from 'config';

export function* getArticle(action) {
  const articleId: string = action.payload;
  const requestURL = `${API_BASE_URL}/articles/${articleId}`;

  try {
    // Call our request helper (see 'utils/request')
    const article: Article = yield call(request, requestURL);
    yield put(actions.articleLoaded(article));
  } catch (err) {
    yield put(actions.articleError(ArticleErrorType.RESPONSE_ERROR));
  }
}

export function* deleteArticle(action) {
  const history = action.payload;
  const articleId: string = yield select(selectArticleId);
  const requestURL = `${API_BASE_URL}/articles/${articleId}`;

  try {
    yield call(request, requestURL, { method: 'DELETE' });
    history.push('/articles');
  } catch (err) {
    console.log(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* articleSaga() {
  yield takeLatest(actions.loadArticle.type, getArticle);
  yield takeLatest(actions.deleteArticle.type, deleteArticle);
}
