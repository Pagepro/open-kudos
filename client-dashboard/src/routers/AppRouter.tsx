import { createBrowserHistory } from 'history'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { matchPath, Route, Router, Switch } from 'react-router-dom'
import AuthSuccessPage from '../components/auth/AuthSuccessPage'
import LoginPage from '../components/LoginPage'
import DashboardApp from '../DashboardApp'
import InfoApp from '../InfoApp'
import { authRoutes, dashboardRoutes, routes } from '../setup/config'
import { pageTitles, titles } from '../setup/messages'
import store from '../setup/store'

const getTitleByPath = (path: string): string => {
  for (const obj of Object.entries(dashboardRoutes)) {
    const route = obj[1]
    const isMatch = matchPath(path, route)
    if (isMatch && isMatch.isExact) {
      return pageTitles[route] || titles.dashboard
    }
  }
  return titles.dashboard
}

const AppRouter: React.FC = () => {
  const history = createBrowserHistory()

  useEffect(() => {
    document.title = getTitleByPath(history.location.pathname)
    const unlisten = history.listen((location) => {
      document.title = getTitleByPath(location.pathname)
    })
    return () => {
      if (unlisten) {
        unlisten()
      }
    }
  }, [history])

  return (
    <Provider store={store}>
      <Router history={history}>
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
      </Router>
    </Provider>
  )
}

export default AppRouter
