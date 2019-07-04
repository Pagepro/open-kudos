import { Layout } from 'antd'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { dashboardRoutes } from './setup/config'
import './scss/main.css'
import SidebarLayout from './layout/SidebarLayout'
import HeaderLayout from './layout/HeaderLayout'
import GiftPage from './components/gifts/GiftPage'
import FooterLayout from './layout/FooterLayout'
import 'antd/dist/antd.css'

const { Content } = Layout

const DashboardApp: React.FC = () => {
  return (
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
  )
}

export default DashboardApp
