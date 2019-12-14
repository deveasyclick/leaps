import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/style.scss';

import ProtectedLayout from './layouts/protected';
import AdminLayout from './layouts/admin';

import Auth from './pages/auth';
import Dashboard from './pages/dashboard/index';
import Account from './pages/account/index';
import Resources from './pages/resources/index';
import Providers from './pages/admin/providers/index';
import Teachers from './pages/admin/teachers/index';
import Reseacher from './pages/admin/researcher/index';
import PageNotFound from './pages/404/index';
import DefaultLayout from './layouts/default';

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <ProtectedLayout exact search path="/" component={Dashboard} />
          <ProtectedLayout exact path="/account" component={Account} />
          <ProtectedLayout
            exact
            search
            path="/resources"
            component={Resources}
          />
          <AdminLayout exact path="/admin" component={Providers} />
          <AdminLayout exact path="/admin/account" component={Account} />
          <AdminLayout exact path="/admin/teachers" component={Teachers} />
          <AdminLayout exact path="/researcher/:uid" component={Reseacher} />
          <Route
            path={[
              '/login',
              'signin',
              'register',
              'signup',
              'forgot',
              'forgot-password',
            ]}
            component={Auth}
          />

          <DefaultLayout component={PageNotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
