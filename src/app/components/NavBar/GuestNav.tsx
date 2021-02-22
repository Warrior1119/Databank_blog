import * as React from 'react';
import styled from 'styled-components/macro';
import { Link as RouterLink } from 'react-router-dom';

export function GuestNav() {
  return (
    <Wrapper>
      <Item to="/login">Login</Item>
      <Item to="/register">Register</Item>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
`;

const Item = styled(RouterLink)`
  color: ${p => p.theme.primary};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-right: 0.25rem;
  }
`;
