import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from 'app/slices/selectors';

export function PrivateRoute({ component: Component, path, ...rest }) {
  const isLoggedIn = useSelector(selectLoggedIn);

  return (
    <Route
      exact
      path={path}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
      {...rest}
    />
  );
}
