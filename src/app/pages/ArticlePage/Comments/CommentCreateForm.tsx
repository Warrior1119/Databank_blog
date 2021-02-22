import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Button } from 'app/components/Button';

interface Props {
  onSubmit: (content: string) => void;
}

export function CommentCreateForm({ onSubmit }: Props) {
  const [content, setContent] = useState('');

  const onClickSubmit = () => {
    if (content.length > 0) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <FormWrapper>
      <CommentText
        value={content}
        onChange={e => setContent(e.target.value)}
      ></CommentText>
      <Button onClick={onClickSubmit}>Leave Comment</Button>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  margin: 0;
`;

const CommentText = styled.textarea`
  margin: 20px 0;
  width: 100%;
  height: 8rem;
  color: ${p => p.theme.textSecondary};
  border: 1px solid ${p => p.theme.border};
  padding: 10px;
  font-size: 1.25rem;

  &:focus {
    outline: none;
  }
`;
