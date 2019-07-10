import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { infoRoutes } from './setup/config'
import LandingPage from './components/LandingPage'
import SuccessInstallationPage from './components/SuccessInstallationPage'

const InfoApp: React.FC = () => {
  return (
    <Switch>
      <Route
        exact={true}
        path={infoRoutes.landingPage}
        component={LandingPage}
      />
      <Route
        exact={true}
        path={infoRoutes.installationPage}
        component={SuccessInstallationPage}
      />
    </Switch>
  )
}

export default InfoApp
