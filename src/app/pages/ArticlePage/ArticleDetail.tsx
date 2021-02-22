import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { Title } from 'app/components/Title';
import { SubTitle } from 'app/components/SubTitle';
import { Content } from 'app/components/Content';
import { useSelector, useDispatch } from 'react-redux';
import { selectArticle, selectError, selectLoading } from './slice/selectors';
import { selectUserId } from 'app/slices/selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { ArticleErrorType } from './slice/types';
import { useArticleSlice } from './slice';
import { AuthorInfo } from 'app/components/AuthorInfo';
import { EditIconButton } from './components/EditIconButton';
import { DeleteIconButton } from './components/DeleteIconButton';
import moment from 'moment-timezone';

interface Props {
  articleId: string;
  history: History;
}

export function ArticleDetail({ articleId, history }) {
  const { actions } = useArticleSlice();

  const article = useSelector(selectArticle);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const authId = useSelector(selectUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.loadArticle(articleId));
  }, []);

  const onDelete = () => {
    const confirmed = window.confirm(
      'Are you sure that you want to delete this article?',
    );
    if (confirmed) {
      dispatch(actions.deleteArticle(history));
    }
  };

  return (
    <>
      {isLoading && <LoadingIndicator small />}
      {article && (
        <ArticleWrapper>
          <Title>{article.title}</Title>
          <SubTitle>
            <Meta>
              <div>
                <AuthorInfo author={article.author} />
                <CreatedTime>
                  {moment(article.createdAt).format('YYYY-MM-DD')}{' '}
                </CreatedTime>
              </div>
              {article.author.id === authId && (
                <ControlWrapper>
                  <EditIconButton to={`/articles/${articleId}/edit`} />
                  <DeleteIconButton onClick={onDelete} />
                </ControlWrapper>
              )}
            </Meta>
          </SubTitle>
          <ContentWrapper>
            <Content content={article.content} />
          </ContentWrapper>
        </ArticleWrapper>
      )}
      {error && <ErrorText>{errorText(error)}</ErrorText>}
    </>
  );
}

export const errorText = (error: ArticleErrorType) => {
  switch (error) {
    default:
      return 'An error has occurred!';
  }
};

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

const ArticleWrapper = styled.div`
  margin: 4.25rem 0 6.25rem 2.25rem;
`;

const Meta = styled.div`
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  margin: 20px 0;
  color: ${p => p.theme.text};
`;

const ControlWrapper = styled.div``;

const CreatedTime = styled.span`
  display: inline-block;
  margin-left: 3rem;
`;

const ContentWrapper = styled.div`
  margin: 6.25rem 0;
`;
