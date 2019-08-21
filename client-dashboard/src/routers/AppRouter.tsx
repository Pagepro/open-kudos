import React, { useEffect, useCallback } from 'react'
import { Provider } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'
import { getTitleByPath } from '../common/helpers/getPageTitle'
import AuthSuccessPage from '../components/auth/AuthSuccessPage'
import LoginPage from '../components/LoginPage'
import DashboardApp from '../DashboardApp'
import InfoApp from '../InfoApp'
import { authRoutes, routes } from '../setup/config'
import history from '../setup/history'
import { IGlobalState } from '../setup/reducers'
import store from '../setup/store'

const AppRouter: React.FC = () => {

  const updatePageTitle = useCallback((state?: IGlobalState) => {
    document.title = getTitleByPath(history.location.pathname, state)
  }, [])

  useEffect(() => {
    updatePageTitle()

    const unsubscribe = store.subscribe(() => {
      updatePageTitle(store.getState())
    })

    const unlisten = history.listen((location) => {
      updatePageTitle()
    })

    return () => {
      if (unlisten) {
        unlisten()
      }
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [updatePageTitle])

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
