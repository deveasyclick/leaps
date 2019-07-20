import React from 'react';
import { Route } from 'react-router-dom';
import { Header } from './components/header/index';

export default function DefaultLayout({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        <React.Fragment>
          <Header />
          <Component {...props} />
        </React.Fragment>
      )}
    />
  );
}
