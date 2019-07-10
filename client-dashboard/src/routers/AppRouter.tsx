import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import DashboardApp from '../DashboardApp';
import InfoApp from '../InfoApp';
import { routes, authRoutes } from '../setup/config';
import AuthSuccessPage from '../components/auth/AuthSuccessPage';
import LoginPage from '../components/LoginPage';

const AppRouter: React.FC = () =>
  <BrowserRouter>
    <Switch>
        <Route
          path={authRoutes.authSuccess}
          exact={true}
          component={AuthSuccessPage}
        />
        <Route
          path={routes.login}
          component={LoginPage}
        />
      <Route
        path={routes.dashboardPage}
        component={DashboardApp}
      />
      <Route
        component={InfoApp}
      />
    </Switch>
  </BrowserRouter>

export default AppRouter
