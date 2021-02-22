import React from 'react';
import styled from 'styled-components/macro';

import { ReactComponent as EditIcon } from '../assets/delete.svg';

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function DeleteIconButton({ onClick }: Props) {
  return (
    <Button onClick={onClick}>
      <EditIcon />
    </Button>
  );
}

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
