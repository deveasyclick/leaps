import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/style.scss';

import ProtectedLayout from './layouts/protected';

import Login from './pages/auth/login';
import NewLogin from './pages/auth/login2';
import Signup from './pages/auth/signup';
import ForgotPassword from './pages/auth/forgot-password';
import Dashboard from './pages/dashboard/index';
import Account from './pages/account/index';

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <ProtectedLayout exact path="/" component={Dashboard} />
          <ProtectedLayout exact path="/account" component={Account} />
          <Route
            path={['/login', '/signin', '/new-login', '/signup', '/forgot']}
            component={NewLogin}
          />

          <Route render={() => <div>Page not found</div>} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
