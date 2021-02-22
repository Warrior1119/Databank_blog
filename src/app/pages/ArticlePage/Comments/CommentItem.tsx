import * as React from 'react';
import styled from 'styled-components/macro';
import { SubTitle } from 'app/components/SubTitle';
import { AuthorInfo } from 'app/components/AuthorInfo';
import { Comment } from 'types/Comment';
import { EditIconButton } from '../components/EditIconButton';
import { DeleteIconButton } from '../components/DeleteIconButton';
import moment from 'moment-timezone';
import { useSelector } from 'react-redux';
import { selectUserId } from 'app/slices/selectors';

interface Props {
  comment: Comment;
  onEdit: () => void;
  onDelete: () => void;
}

export function CommentItem({ comment, onEdit, onDelete }: Props) {
  const { content, author, createdAt } = comment;
  const authId = useSelector(selectUserId);

  return (
    <Wrapper>
      <SubTitle>
        <Meta>
          <AuthorInfo author={author} />

          <MetaInfo>
            {author.id === authId && (
              <ControlWrapper>
                <EditIconButton onClick={onEdit} />
                <DeleteIconButton onClick={onDelete} />
              </ControlWrapper>
            )}
            <CreatedTime>{moment(createdAt).fromNow()} </CreatedTime>
          </MetaInfo>
        </Meta>
      </SubTitle>
      <Content>{content}</Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 1.25rem 0 1.25rem 0rem;
  color: ${p => p.theme.text};
  padding: 20px 0;
`;

const Content = styled.p`
  color: ${p => p.theme.textSecondary};
  font-size: 0.8rem;
  margin: 0;
  white-space: pre-wrap;
`;

const Meta = styled.div`
  font-size: 0.7rem;
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  margin-bottom: 10px;
  color: ${p => p.theme.textSecondary};
`;

const MetaInfo = styled.div`
  display: flex;
`;

const ControlWrapper = styled.div`
  margin-right: 20px;
`;

const CreatedTime = styled.span`
  line-height: 1.4rem;
`;
