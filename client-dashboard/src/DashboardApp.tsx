import { Layout } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import DashboardPage from './components/dashboard/DashboardPage'
import GiftPage from './components/gifts/GiftPage'
import NewGiftPage from './components/gifts/NewGiftPage'
import SettingsPage from './components/settings/SettingsPage'
import FooterLayout from './layout/FooterLayout'
import HeaderLayout from './layout/HeaderLayout'
import SidebarLayout from './layout/SidebarLayout'
import './scss/main.css'
import { dashboardRoutes } from './setup/config'
import { IGlobalState } from './setup/reducers'
import EditGiftPage from './components/gifts/EditGiftPage';

const { Content } = Layout

const DashboardApp: React.FC = () => {
  const token = useSelector<IGlobalState, string>(state => state.token)

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
              <Route
                path={dashboardRoutes.newGiftPage}
                exact={true}
                component={NewGiftPage}
              />
              <Route
                path={dashboardRoutes.editGiftPage}
                exact={true}
                component={EditGiftPage}
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
