import styled from 'styled-components/macro';

interface Props {
  secondary?: boolean;
  small?: boolean;
}

export const Button = styled.button<Props>`
  color: ${p => (p.secondary ? p.theme.textSecondary : p.theme.primary)};
  font-weight: bold;
  border: 1px solid
    ${p => (p.secondary ? p.theme.textSecondary : p.theme.primary)};
  background: #fff;
  padding: ${p => (p.small ? '0.4rem 0.8rem' : '0.5rem 2rem')};
  font-size: ${p => (p.small ? '0.8rem' : '1rem')};
  cursor: pointer;

  &:hover {
    background: ${p => (p.secondary ? p.theme.textSecondary : p.theme.primary)};
    color: #fff;
  }

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }

  &:active {
    opacity: 0.7;
  }
`;
