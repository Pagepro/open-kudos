import { Layout } from 'antd'
import 'antd/dist/antd.css'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import GiftPage from './components/gifts/GiftPage'
import FooterLayout from './layout/FooterLayout'
import HeaderLayout from './layout/HeaderLayout'
import SidebarLayout from './layout/SidebarLayout'
import './scss/main.css'
import { dashboardRoutes } from './setup/config'
import { getAuthToken } from './setup/interceptors/utiles'

const { Content } = Layout

const DashboardApp: React.FC = () => {
  const token = getAuthToken()

  return (
    token ?
      <Layout className="app-container">
        <SidebarLayout />
        <Layout>
          <HeaderLayout />
          <Content className="content-container">
            <Switch>
              <Route
                path={dashboardRoutes.giftsManagementPage}
                exact={true}
                component={GiftPage}
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
