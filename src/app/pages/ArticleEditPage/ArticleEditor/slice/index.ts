import { PayloadAction } from '@reduxjs/toolkit';
import { ArticleForm, Article } from 'types/Article';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { articleEditSaga } from './saga';
import { ArticleEditState, ArticleEditErrorType } from './types';
import { History } from 'history';

interface LoadArticlePayload {
  history: History;
  articleForm: ArticleForm;
}

export const initialState: ArticleEditState = {
  articleId: null,
  article: null,
  loading: false,
  editing: false,
  error: null,
};

const slice = createSlice({
  name: 'articleEdit',
  initialState,
  reducers: {
    loadArticle(state, action: PayloadAction<string>) {
      state.articleId = action.payload;
      state.loading = true;
      state.error = null;
      state.article = null;
    },
    articleLoaded(state, action: PayloadAction<Article>) {
      state.loading = false;
      state.error = null;
      state.article = action.payload;
    },

    updateArticle(state, action: PayloadAction<LoadArticlePayload>) {
      state.editing = true;
      state.error = null;
    },
    articleUpdated(state) {
      state.editing = false;
      state.error = null;
    },
    articleError(state, action: PayloadAction<ArticleEditErrorType>) {
      state.editing = false;
      state.error = action.payload;
    },
  },
});

export const { actions: articleActions, reducer } = slice;

export const useArticleSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: articleEditSaga });
  return { actions: slice.actions };
};
