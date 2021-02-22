import { PayloadAction } from '@reduxjs/toolkit';
import { ArticleForm } from 'types/Article';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { articleNewSaga } from './saga';
import { ArticleNewState, ArticleNewErrorType } from './types';
import { History } from 'history';

interface LoadArticlePayload {
  history: History;
  articleForm: ArticleForm;
}

export const initialState: ArticleNewState = {
  publishing: false,
  error: null,
};

const slice = createSlice({
  name: 'articleNew',
  initialState,
  reducers: {
    createArticle(state, action: PayloadAction<LoadArticlePayload>) {
      state.publishing = true;
      state.error = null;
    },
    articleCreated(state) {
      state.publishing = false;
      state.error = null;
    },
    articleNewError(state, action: PayloadAction<ArticleNewErrorType>) {
      state.publishing = false;
      state.error = action.payload;
    },
  },
});

export const { actions: articleActions, reducer } = slice;

export const useArticleSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: articleNewSaga });
  return { actions: slice.actions };
};
