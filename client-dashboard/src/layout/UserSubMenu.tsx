import { Icon, Menu } from 'antd'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout as logoutAction } from '../components/auth/actions'
import { setUserRole as setUserRoleAction } from '../components/auth/userRoleActions'
import TitleIcon from './TitleIcon'

interface IUserName {
  user: string,
  is_admin: boolean,
  is_owner: boolean,
  is_primary_owner: boolean,
}

const { SubMenu, Item } = Menu

const UserSubMenu: React.FC = () => {
  const [user, setUser] = useState(String.empty)
  const dispatch = useDispatch()

  const logout = useCallback(async () => {
    logoutAction()(dispatch)
  }, [dispatch])

  useEffect(() => {
    const fetchUserName = async () => {
      const { data } = await axios.get<IUserName>('/api/users/me')
      setUserRoleAction(data)(dispatch)
      const { user } = data
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
