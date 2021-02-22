import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectComments,
  selectLoading,
  selectEditingId,
  selectError,
} from './slice/selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { CommentsErrorType } from './slice/types';
import { useCommentsSlice } from './slice';
import { CommentItem } from './CommentItem';
import { CommentCreateForm } from './CommentCreateForm';
import { CommentEditForm } from './CommentEditForm';

export function Comments({ articleId }) {
  const { actions } = useCommentsSlice();

  const comments = useSelector(selectComments);
  const isLoading = useSelector(selectLoading);
  const editingId = useSelector(selectEditingId);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.loadComments(articleId));
  }, [articleId]);

  const onEditComment = id => {
    dispatch(actions.selectComment(id));
  };

  const onCancelEditComment = () => {
    dispatch(actions.deselectComment());
  };

  const onDeleteComment = id => {
    const confirmed = window.confirm(
      'Are you sure that you want to delete this comment?',
    );
    if (confirmed) {
      dispatch(actions.deleteComment(id));
    }
  };

  const onCreateComment = (content: string) => {
    dispatch(actions.createComment({ content }));
  };

  const onUpdateComment = (content: string) => {
    dispatch(actions.updateComment({ content }));
  };

  return (
    <CommentsWrapper>
      <CommentTitle>Leave Comment</CommentTitle>
      <CommentCreateForm onSubmit={onCreateComment} />
      {isLoading && <LoadingIndicator small />}
      {comments.length > 0 && (
        <>
          <CommentTitle>Comments</CommentTitle>
          {comments.map(comment =>
            editingId === comment.id ? (
              <CommentEditForm
                comment={comment}
                onSubmit={onUpdateComment}
                onCancel={onCancelEditComment}
              />
            ) : (
              <CommentItem
                comment={comment}
                onEdit={() => onEditComment(comment.id)}
                onDelete={() => onDeleteComment(comment.id)}
              />
            ),
          )}
        </>
      )}

      {error && <ErrorText>{errorText(error)}</ErrorText>}
    </CommentsWrapper>
  );
}

export const errorText = (error: CommentsErrorType) => {
  switch (error) {
    default:
      return 'An error has occurred!';
  }
};

const CommentsWrapper = styled.div`
  margin: 2.25rem 0 0 2.25rem;
`;
const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

const CommentTitle = styled.h4`
  margin: 2.25rem 0 0 0rem;
  font-size: 1.5rem;
  padding-bottom: 10px;
  border-bottom: 1px solid ${p => p.theme.border};
  color: ${p => p.theme.text};
`;
