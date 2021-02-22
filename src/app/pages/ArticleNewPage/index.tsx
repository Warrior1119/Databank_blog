import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { ArticleEditor } from './ArticleEditor';
import { PageWrapper } from 'app/components/PageWrapper';
import { PageContent } from 'app/components/PageContent';
import { PageTitle } from 'app/components/PageTitle';

export function ArticleNewPage({ history }) {
  return (
    <>
      <Helmet>
        <title>Post New Article</title>
        <meta name="description" content="Write your own new article." />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <PageContent>
          <PageTitle>New Article</PageTitle>
          <ArticleEditor history={history} />
        </PageContent>
      </PageWrapper>
    </>
  );
}
