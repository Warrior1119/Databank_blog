import styled from 'styled-components/macro';

export const FormInput = styled.input`
  margin: 1.25rem 0;
  color: ${p => p.theme.text};
  padding: 0.575rem 0.75rem;
  border: 1px solid ${p => p.theme.border};
  width: 100%;

  &:focus {
    outline: none;
  }
`;
