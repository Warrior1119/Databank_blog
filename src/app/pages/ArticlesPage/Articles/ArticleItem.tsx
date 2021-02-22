import * as React from 'react';
import styled from 'styled-components/macro';
import { Title } from 'app/components/Title';
import { SubTitle } from 'app/components/SubTitle';
import { Content } from 'app/components/Content';
import { Link } from 'app/components/Link';
import { AuthorInfo } from 'app/components/AuthorInfo';
import { Article } from 'types/Article';
import moment from 'moment-timezone';

interface Props {
  article: Article;
}

const TITLE_MAX_LEN = 60;
const SUMMARY_MAX_LEN = 300;

export function ArticleItem({ article }: Props) {
  const { id, title, summary, author, createdAt } = article;

  return (
    <Wrapper>
      <SubTitle>
        <Meta>
          <CreatedTime>{moment(createdAt).format('YYYY-MM-DD')} </CreatedTime>
          <AuthorInfo author={author} />
        </Meta>
      </SubTitle>

      <Title>{summarize(title, TITLE_MAX_LEN)}</Title>
      <SubTitle></SubTitle>
      <Content
        content={summarize(summary as string, SUMMARY_MAX_LEN) as string}
      />
      <ReadMore>
        <Link to={`/articles/${id}`}>READ MORE</Link>
      </ReadMore>
    </Wrapper>
  );
}

const summarize = (str: string, len: number): string => {
  if (str.length > len) {
    str = str.substring(0, len) + '...';
  }
  return str;
};

const Wrapper = styled.div`
  margin: 4.25rem 0 6.25rem 2.25rem;
  color: ${p => p.theme.text};
`;

const ReadMore = styled.div`
  font-style: italic;
  font-size: 0.9rem;
  color: ${p => p.theme.text};

  ${Link}:hover {
    text-decoration: underline;
  }
`;

const Meta = styled.div`
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  margin-bottom: 15px;
  color: ${p => p.theme.text};
  border-bottom: 1px solid ${p => p.theme.primary};
`;

const CreatedTime = styled.span``;
