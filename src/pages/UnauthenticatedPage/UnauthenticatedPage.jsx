import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ROUTE } from '@constants/routing';

const LoginPage = lazy(() => import('../Login/Login'));

const UnauthenticatedPage = () => (
  <Router>
    <Switch>
      <Route
        exact
        path={ROUTE.LOGIN.to}
        render={() => <LoginPage documentTitle={ROUTE.LOGIN.title} />}
      />
      <Route path="*">
        <Redirect to={ROUTE.LOGIN.to} />
      </Route>
    </Switch>
  </Router>
);

export default UnauthenticatedPage;
