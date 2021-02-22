import * as React from 'react';
import styled from 'styled-components/macro';

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

interface Props extends DivProps {
  content?: string;
}

export const Content = ({ content, ...restOf }: Props) => (
  <ContentWrapper>
    {content && (
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
        {...restOf}
      />
    )}
  </ContentWrapper>
);

const ContentWrapper = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  color: ${p => p.theme.textSecondary};
  margin: 0.625rem 0 1.5rem 0;
`;
