import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/style.scss';

import ProtectedLayout from './layouts/protected';

import Auth from './pages/auth';
import Dashboard from './pages/dashboard/index';
import Account from './pages/account/index';
import Resources from './pages/resources/index';
import AdminDashboard from './pages/admin/dashboard/index';

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <ProtectedLayout exact path="/" component={Dashboard} />
          <ProtectedLayout exact path="/account" component={Account} />
          <ProtectedLayout exact path="/resources" component={Resources} />
          <ProtectedLayout exact path="/admin" component={AdminDashboard} />
          {/* <Route component={Auth} /> */}

          <Route render={() => <div>Page not found</div>} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
