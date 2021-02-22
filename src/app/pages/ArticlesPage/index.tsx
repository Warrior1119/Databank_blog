import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { Articles } from './Articles';
import { PageWrapper } from 'app/components/PageWrapper';
import { PageContent } from 'app/components/PageContent';

export function ArticlesPage() {
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
          <Articles />
        </PageContent>
      </PageWrapper>
    </>
  );
}
