import * as React from 'react';
import styled from 'styled-components/macro';

type AnchorProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

interface Props extends AnchorProps {}

export const Title = ({ children }: Props) => (
  <TitleWrapper>{children}</TitleWrapper>
);

const TitleWrapper = styled.h3`
  font-size: 1.25rem;
  margin: 0;
  color: ${p => p.theme.text};

  & a {
    margin: 0;
    color: ${p => p.theme.text};
    text-decoration: none;
    &:hover {
      color: ${p => p.theme.primary};
    }
  }
`;
