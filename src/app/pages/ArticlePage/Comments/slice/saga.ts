import { call, put, takeLatest, select } from 'redux-saga/effects';
import { request } from 'utils/request';
import {
  selectArticleId,
  selectEditingId,
  selectDeletingId,
} from './selectors';
import { commentsActions as actions } from '.';
import { CommentsErrorType } from './types';
import { API_BASE_URL } from 'config';
import { Comment } from 'types/Comment';
import { selectLoggedIn, selectToken } from 'app/slices/selectors';

/**
 * Github repos request/response handler
 */
export function* getComments(action) {
  const articleId: string = yield select(selectArticleId);
  const requestURL = `${API_BASE_URL}/articles/${articleId}/comments`;

  try {
    // Call our request helper (see 'utils/request')
    const comments: Comment[] = yield call(request, requestURL);
    yield put(actions.commentsLoaded(comments));
  } catch (err) {
    yield put(actions.commentsError(CommentsErrorType.RESPONSE_ERROR));
  }
}

export function* createComment(action) {
  const articleId: string = yield select(selectArticleId);
  const commentForm = action.payload;
  const requestURL = `${API_BASE_URL}/articles/${articleId}/comments`;
  const loggedIn = yield select(selectLoggedIn);
  const token = yield select(selectToken);
  if (loggedIn && token) {
    try {
      // Call our request helper (see 'utils/request')
      yield call(request, requestURL, {
        body: commentForm,
        headers: { authorization: token },
        method: 'POST',
      });
      yield put(actions.commentCreated());
      yield put(actions.loadComments(articleId));
    } catch (err) {
      yield put(actions.commentCreated());
    }
  }
}

export function* updateComment(action) {
  const commentId: string = yield select(selectEditingId);
  const commentForm = action.payload;
  const requestURL = `${API_BASE_URL}/comments/${commentId}`;
  const loggedIn = yield select(selectLoggedIn);
  const token = yield select(selectToken);
  if (loggedIn && token) {
    try {
      // Call our request helper (see 'utils/request')
      const comment: Comment = yield call(request, requestURL, {
        body: commentForm,
        headers: { authorization: token },
        method: 'PUT',
      });
      yield put(actions.commentEdited(comment));
      yield put(actions.deselectComment());
    } catch (err) {
      yield put(actions.commentEdited(null));
    }
  }
}

export function* deleteComment(action) {
  const articleId: string = yield select(selectArticleId);
  const commentId: string = yield select(selectDeletingId);
  const requestURL = `${API_BASE_URL}/comments/${commentId}`;
  const loggedIn = yield select(selectLoggedIn);
  const token = yield select(selectToken);
  if (loggedIn && token) {
    try {
      yield call(request, requestURL, {
        headers: { authorization: token },
        method: 'DELETE',
      });
      yield put(actions.loadComments(articleId));
    } catch (err) {
      console.log(err);
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* commentsSaga() {
  yield takeLatest(actions.loadComments.type, getComments);
  yield takeLatest(actions.createComment.type, createComment);
  yield takeLatest(actions.updateComment.type, updateComment);
  yield takeLatest(actions.deleteComment.type, deleteComment);
}
