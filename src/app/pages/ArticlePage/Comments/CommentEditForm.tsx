import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Comment } from 'types/Comment';
import { Button } from 'app/components/Button';
import { SubTitle } from 'app/components/SubTitle';
import { AuthorInfo } from 'app/components/AuthorInfo';

interface Props {
  comment: Comment;
  onSubmit: (content: string) => void;
  onCancel: () => void;
}

export function CommentEditForm({ comment, onSubmit, onCancel }: Props) {
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(comment.content);
  }, [comment.content]);

  const onClickSubmit = () => {
    if (content.length > 0) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <FormWrapper>
      <SubTitle>
        <Meta>
          <AuthorInfo author={comment.author} />
        </Meta>
      </SubTitle>
      <CommentText
        value={content}
        onChange={e => setContent(e.target.value)}
      ></CommentText>
      <ControlWrapper>
        <Button onClick={onClickSubmit} small>
          Update Comment
        </Button>
        <CancelButtonWrapper>
          <Button onClick={onCancel} small secondary>
            Cancel
          </Button>
        </CancelButtonWrapper>
      </ControlWrapper>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  margin: 1.25rem 0 1.25rem 0rem;
  padding: 20px 0;
`;

const CommentText = styled.textarea`
  margin: 20px 0;
  width: 100%;
  height: 6rem;
  color: ${p => p.theme.textSecondary};
  border: 1px solid ${p => p.theme.border};
  padding: 10px;
  font-size: 1rem;

  &:focus {
    outline: none;
  }
`;

const Meta = styled.div`
  font-size: 0.7rem;
  display: flex;
  justify-content: space-between;
  color: ${p => p.theme.textSecondary};
`;

const ControlWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CancelButtonWrapper = styled.div`
  margin-left: 20px;
`;
