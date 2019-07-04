import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import DashboardApp from '../DashboardApp';
import InfoApp from '../InfoApp';
import { routes } from '../setup/config';

class AppRouter extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path={routes.dashboardPage}
            component={DashboardApp}
          />
          <Route
            component={InfoApp}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default AppRouter
