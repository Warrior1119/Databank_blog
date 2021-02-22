import * as React from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { ArticleEditor } from './ArticleEditor';
import { PageWrapper } from 'app/components/PageWrapper';
import { PageContent } from 'app/components/PageContent';
import { PageTitle } from 'app/components/PageTitle';

interface Props extends RouteComponentProps<any> {}

interface Params {
  articleId: string;
}

export function ArticleEditPage({ history }: Props) {
  const { articleId } = useParams<Params>();

  return (
    <>
      <Helmet>
        <title>Edit Article</title>
        <meta name="description" content="Edit article" />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <PageContent>
          <PageTitle>Edit Article</PageTitle>
          <ArticleEditor history={history} articleId={articleId} />
        </PageContent>
      </PageWrapper>
    </>
  );
}
