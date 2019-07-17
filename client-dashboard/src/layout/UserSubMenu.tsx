import { Menu } from 'antd'
import React from 'react'
import { common } from '../setup/const';
import { Redirect } from 'react-router';
import { routes } from '../setup/config';

const { SubMenu, Item } = Menu

const logout = () => {
  console.log('logout')
  localStorage.removeItem(common.accessTokenKey)
  return <Redirect to={routes.login} />
}

const UserSubMenu: React.FC = () => {
  return (
    <Menu
      theme='dark'
      mode='inline'
    >
      <SubMenu
        title='username'
      >
        <Item>
          <span onClick={logout}>Logout</span>
        </Item>
      </SubMenu>
    </Menu>
  )
}

export default UserSubMenu
