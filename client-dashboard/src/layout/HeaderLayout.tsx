import { Layout } from 'antd'
import React from 'react'
import UserSubMenu from './UserSubMenu'
const { Header } = Layout

const HeaderLayout: React.FC = () =>
  <Header className="header-container">
    <UserSubMenu />
  </Header>

export default HeaderLayout
