import { PayloadAction } from '@reduxjs/toolkit';
import { Article } from 'types/Article';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { articleSaga } from './saga';
import { ArticleState, ArticleErrorType } from './types';

export const initialState: ArticleState = {
  articleId: null,
  article: null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    loadArticle(state, action: PayloadAction<string>) {
      state.articleId = action.payload;
      state.loading = true;
      state.error = null;
      state.article = null;
    },
    deleteArticle(state, action: PayloadAction<History>) {},
    articleLoaded(state, action: PayloadAction<Article>) {
      state.loading = false;
      state.error = null;
      state.article = action.payload;
    },
    articleError(state, action: PayloadAction<ArticleErrorType>) {
      state.loading = false;
      state.error = action.payload;
      state.article = null;
    },
  },
});

export const { actions: articleActions, reducer } = slice;

export const useArticleSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: articleSaga });
  return { actions: slice.actions };
};
