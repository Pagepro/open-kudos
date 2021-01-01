import { Layout } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import DashboardPage from './components/dashboard/DashboardPage'
import GiveKudosPage from './components/give-kudos/GiveKudosPage'
import GiftRequestsPage from './components/gift-requests/GiftRequestsPage'
import EditGiftPage from './components/gifts/EditGiftPage'
import GiftPage from './components/gifts/GiftPage'
import NewGiftPage from './components/gifts/NewGiftPage'
import SettingsPage from './components/settings/SettingsPage'
import TransfersPage from './components/transfers/TransfersPage'
import UsersPage from './components/users/UsersPage'
import FooterLayout from './layout/FooterLayout'
import HeaderLayout from './layout/HeaderLayout'
import SidebarLayout from './layout/SidebarLayout'
import './scss/main.css'
import { dashboardRoutes } from './setup/config'
import { IGlobalState } from './setup/reducers'

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
                path={dashboardRoutes.giveKudosPage}
                exact={true}
                component={GiveKudosPage}
              />
              <Route
                path={dashboardRoutes.giftRequestsPage}
                exact={true}
                component={GiftRequestsPage}
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
              <Route
                path={dashboardRoutes.transfersPage}
                exact={true}
                component={TransfersPage}
              />
              <Route
                path={dashboardRoutes.teamManagementPage}
                exact={true}
                component={UsersPage}
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
