import { call, put, takeLatest, select } from 'redux-saga/effects';
import { request } from 'utils/request';
import { articlesActions } from 'app/pages/ArticlesPage/Articles/slice';
import { selectArticleId } from './selectors';
import { articleActions as actions } from '.';
import { Article } from 'types/Article';
import { ArticleEditErrorType } from './types';
import { API_BASE_URL } from 'config';
import { selectLoggedIn, selectToken } from 'app/slices/selectors';

export function* getArticle(action) {
  const articleId: string = action.payload;
  const requestURL = `${API_BASE_URL}/articles/${articleId}`;

  try {
    // Call our request helper (see 'utils/request')
    const article: Article = yield call(request, requestURL);
    yield put(actions.articleLoaded(article));
  } catch (err) {
    yield put(actions.articleError(ArticleEditErrorType.RESPONSE_ERROR));
  }
}
export function* updateArticle(action) {
  const { articleForm, history } = action.payload;
  const articleId: string = yield select(selectArticleId);
  const requestURL = `${API_BASE_URL}/articles/${articleId}`;
  const loggedIn = yield select(selectLoggedIn);
  const token = yield select(selectToken);

  if (loggedIn && token) {
    try {
      // Call our request helper (see 'utils/request')
      yield call(request, requestURL, {
        body: articleForm,
        headers: { authorization: token },
        method: 'PUT',
      });
      yield put(actions.articleUpdated());
      yield put(articlesActions.loadArticles());
      history.push(`/articles/${articleId}`);
    } catch (err) {
      yield put(actions.articleError(ArticleEditErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* articleEditSaga() {
  yield takeLatest(actions.loadArticle.type, getArticle);
  yield takeLatest(actions.updateArticle.type, updateArticle);
}
