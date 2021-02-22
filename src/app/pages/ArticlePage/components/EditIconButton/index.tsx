import React from 'react';
import styled from 'styled-components/macro';
import { Link as RouterLink } from 'react-router-dom';
import { ReactComponent as EditIcon } from '../assets/edit.svg';

interface Props {
  to?: string;
  onClick?: Function;
}

export function EditIconButton({ to, onClick }: Props) {
  if (to) {
    return (
      <RouterLink to={to}>
        <IconWrapper>
          <EditIcon />
        </IconWrapper>
      </RouterLink>
    );
  }
  if (onClick) {
    return (
      <Button onClick={() => onClick()}>
        <EditIcon />
      </Button>
    );
  }

  return <></>;
}

const IconWrapper = styled.span`
  display: inline-block;
  padding: 3px 10px;
  color: ${p => p.theme.text};
`;

const Button = styled.button`
  padding: 3px 10px;
  margin: 0;
  color: ${p => p.theme.text};
  border: none;
  background: #fff;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
  }
  &:active {
    opacity: 0.4;
  }
`;
