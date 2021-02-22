import * as React from 'react';
import styled from 'styled-components/macro';
import { Author } from 'types/Author';

interface Props {
  author: Author;
}

export const AuthorInfo = ({ author }: Props) => {
  const { name, avatar } = author;
  return (
    <Wrapper>
      {avatar ? (
        <Avatar src={avatar} />
      ) : (
        <Noavatar>{name.substr(0, 1).toUpperCase()}</Noavatar>
      )}

      <Name>{name}</Name>
    </Wrapper>
  );
};

const Wrapper = styled.span`
  font-size: 0.8rem;
  line-height: 1.5;
  color: ${p => p.theme.text};
  display: inline-block;
`;

const Avatar = styled.img`
  border: 1px solid ${p => p.theme.border};
  width: 1.5rem;
  height: 1.5rem;
  padding: 1px;
  border-radius: 50%;
`;

const Noavatar = styled.div`
  display: inline-block;
  text-align: center;
  border: 1px solid ${p => p.theme.border};
  width: 1.5rem;
  height: 1.5rem;
  padding: 1px;
  border-radius: 50%;
  vertical-align: middle;
`;

const Name = styled.span`
  display: inline-block;
  margin-left: 0.5rem;
`;
