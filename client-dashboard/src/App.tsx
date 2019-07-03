import { Layout } from 'antd'
import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { routes } from './setup/config'
import './scss/main.css'
import SidebarLayout from './layout/SidebarLayout'
import HeaderLayout from './layout/HeaderLayout'
import GiftPage from './components/gifts/GiftPage'
import FooterLayout from './layout/FooterLayout'
import 'antd/dist/antd.css'

const { Content } = Layout

const App: React.FC = () => {
  return (
    // <Provider>
    <BrowserRouter>
      <Layout className="app-container">
        <SidebarLayout />
        <Layout>
          <HeaderLayout />
          <Content className="content-container">
            <Switch>
              <Route
                path={routes.giftsManagementPage}
                exact={true}
                component={GiftPage}
              />
            </Switch>
          </Content>
          <FooterLayout />
        </Layout>
      </Layout>
    </BrowserRouter>
    // </Provider>
  )
}

export default App
