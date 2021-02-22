/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { PrivateRoute } from 'app/components/PrivateRoute';
import { GlobalStyle } from 'styles/global-styles';

import { ArticlesPage } from './pages/ArticlesPage';
import { ArticlePage } from './pages/ArticlePage';
import { LoginPage } from './pages/LoginPage';
import { LogoutPage } from './pages/LogoutPage';
import { ProfilePage } from './pages/ProfilePage';
import { RegisterPage } from './pages/RegisterPage';
import { ArticleNewPage } from './pages/ArticleNewPage';
import { ArticleEditPage } from './pages/ArticleEditPage';
import { NotFoundPage } from './components/NotFoundPage';
import { useAuthSlice } from 'app/slices';

export function App() {
  useAuthSlice();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Databank Blog"
        defaultTitle="Databank Blog website"
      >
        <meta name="description" content="Databank Website" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={ArticlesPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <PrivateRoute path="/logout" component={LogoutPage} />
        <PrivateRoute path="/profile" component={ProfilePage} />
        <Route exact path="/articles" component={ArticlesPage} />
        <PrivateRoute path="/articles/new" component={ArticleNewPage} />
        <PrivateRoute
          path="/articles/:articleId/edit"
          component={ArticleEditPage}
        />
        <Route exact path="/articles/:articleId" component={ArticlePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
