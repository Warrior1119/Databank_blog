import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { selectArticles, selectLoading, selectError } from './slice/selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { ArticlesErrorType } from './slice/types';
import { useArticlesSlice } from './slice';
import { ArticleItem } from './ArticleItem';

export function Articles() {
  const { actions } = useArticlesSlice();

  const articles = useSelector(selectArticles);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.loadArticles());
  }, []);

  return (
    <>
      {isLoading && <LoadingIndicator small />}
      {articles.length > 0 &&
        articles.map(article => (
          <ArticleItem key={article.id} article={article} />
        ))}
      {error && <ErrorText>{errorText(error)}</ErrorText>}
    </>
  );
}

export const errorText = (error: ArticlesErrorType) => {
  switch (error) {
    default:
      return 'An error has occurred!';
  }
};

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;
