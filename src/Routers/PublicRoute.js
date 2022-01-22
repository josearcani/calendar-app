import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
  isAuth,
  component: Component,
  ...rest
}) => {
  return (
    <Route { ...rest }
      component={props => (
        (isAuth)
          ? <Redirect to="/" />
          : <Component { ...props } />
      )}
    />
  )
};
