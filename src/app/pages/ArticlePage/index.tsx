import * as React from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { ArticleDetail } from './ArticleDetail';
import { PageWrapper } from 'app/components/PageWrapper';
import { PageContent } from 'app/components/PageContent';
import { Comments } from './Comments';

interface Props extends RouteComponentProps<any> {}

interface Params {
  articleId: string;
}

export function ArticlePage({ history }: Props) {
  const { articleId } = useParams<Params>();

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <PageContent>
          <ArticleDetail articleId={articleId} history={history} />
          <Comments articleId={articleId} />
        </PageContent>
      </PageWrapper>
    </>
  );
}
