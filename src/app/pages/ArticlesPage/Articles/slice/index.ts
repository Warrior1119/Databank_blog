import { PayloadAction } from '@reduxjs/toolkit';
import { Article } from 'types/Article';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { articlesSaga } from './saga';
import { ArticlesState, ArticlesErrorType } from './types';

export const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    loadArticles(state) {
      state.loading = true;
      state.error = null;
      state.articles = [];
    },
    articlesLoaded(state, action: PayloadAction<Article[]>) {
      state.loading = false;
      state.error = null;
      state.articles = action.payload;
    },
    articlesError(state, action: PayloadAction<ArticlesErrorType>) {
      state.loading = false;
      state.error = action.payload;
      state.articles = [];
    },
  },
});

export const { actions: articlesActions, reducer } = slice;

export const useArticlesSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: articlesSaga });
  return { actions: slice.actions };
};
