import { Menu, Icon } from 'antd'
import React, { useEffect, useState } from 'react'
import { common } from '../setup/const'
import { Redirect } from 'react-router'
import { routes } from '../setup/config'
import axios from 'axios'
import TitleIcon from './TitleIcon';

interface IUserName {
  user: string
}

const { SubMenu, Item } = Menu

const logout = () => {
  console.log('logout')
  localStorage.removeItem(common.accessTokenKey)
  return <Redirect to={routes.login} />
}

const UserSubMenu: React.FC = () => {
  const [user, setUser] = useState("")

  useEffect(() => {
    const fetchUserName = async () => {
      const { data: { user } } = await axios.get<IUserName>('/api/users/me')
      setUser(user)
    };

    fetchUserName();
  }, [])

  return (
    <Menu
      theme='dark'
      mode='inline'
      className='user-menu-container'
    >
      <SubMenu
        title={
          <TitleIcon
            iconName='user'
            title={user}
          />
        }
      >
        <Item onClick={logout}>
          <span>
            <Icon type="logout" />
            Logout
          </span>
        </Item>
      </SubMenu>
    </Menu>
  )
}

export default UserSubMenu
