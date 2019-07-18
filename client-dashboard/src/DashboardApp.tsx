import { Layout } from 'antd'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import GiftPage from './components/gifts/GiftPage'
import FooterLayout from './layout/FooterLayout'
import HeaderLayout from './layout/HeaderLayout'
import SidebarLayout from './layout/SidebarLayout'
import './scss/main.css'
import { dashboardRoutes } from './setup/config'
import DashboardPage from './components/dashboard/DashboardPage'
import SettingsPage from './components/settings/SettingsPage'
import { useSelector } from 'react-redux'
import { IGlobalState } from './setup/reducers'

const { Content } = Layout

const DashboardApp: React.FC = () => {
  const token = useSelector<IGlobalState, string>(({ token }) => token)

  return (
    token ?
      <Layout className="app-container">
        <SidebarLayout />
        <Layout>
          <HeaderLayout />
          <Content className="content-container">
            <Switch>
              <Route
                path={dashboardRoutes.dashboardPage}
                exact={true}
                component={DashboardPage}
              />
              <Route
                path={dashboardRoutes.giftsManagementPage}
                exact={true}
                component={GiftPage}
              />
              <Route
                path={dashboardRoutes.settingPage}
                exact={true}
                component={SettingsPage}
              />
            </Switch>
          </Content>
          <FooterLayout />
        </Layout>
      </Layout>
      :
      <Redirect to="/login" />
  )
}

export default DashboardApp
