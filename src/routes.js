import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/style.scss';

import ProtectedLayout from './layouts/protected';

import Auth from './pages/auth';
import Signup from './pages/auth/signup';
import ForgotPassword from './pages/auth/forgot-password';
import Dashboard from './pages/dashboard/index';
import Account from './pages/account/index';
import AdminDashboard from './pages/admin/dashboard/index';

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <ProtectedLayout exact path="/" component={Dashboard} />
          <ProtectedLayout exact path="/account" component={Account} />
          <Route component={Auth} />
          <ProtectedLayout exact path="/admin" component={AdminDashboard} />

          <Route render={() => <div>Page not found</div>} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
