import { Menu, Icon } from 'antd'
import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import TitleIcon from './TitleIcon'
import { useDispatch } from 'react-redux'
import { logout as logoutAction } from '../components/auth/actions'

interface IUserName {
  user: string
}

const { SubMenu, Item } = Menu

const UserSubMenu: React.FC = () => {
  const [user, setUser] = useState("")
  const dispatch = useDispatch()

  const logout = useCallback(() => {
    logoutAction()(dispatch)
  }, [dispatch])

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
