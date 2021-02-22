import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components/macro';

export function Logo() {
  return (
    <Wrapper>
      <Title to="/">Databank Blog</Title>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled(RouterLink)`
  font-size: 1.25rem;
  color: ${p => p.theme.text};
  font-weight: bold;
  margin-right: 1rem;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }
`;
