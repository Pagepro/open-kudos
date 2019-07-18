import { Icon, Menu } from 'antd'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout as logoutAction } from '../components/auth/actions'
import TitleIcon from './TitleIcon'

interface IUserName {
  user: string
}

const { SubMenu, Item } = Menu

const UserSubMenu: React.FC = () => {
  const [user, setUser] = useState("")
  const dispatch = useDispatch()

  const logout = useCallback(async () => {
    logoutAction()(dispatch)
  }, [dispatch])

  useEffect(() => {
    const fetchUserName = async () => {
      const { data: { user } } = await axios.get<IUserName>('/api/users/me')
      setUser(user)
    }

    fetchUserName()
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
