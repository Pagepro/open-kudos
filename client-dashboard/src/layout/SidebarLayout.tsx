import React, { useEffect, useState } from 'react'
import { Icon, Layout, Menu } from 'antd'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { dashboardRoutes } from '../setup/config'
import { titles } from '../setup/messages'
import store from '../setup/store'

interface IMenuItem {
  content: string,
  url: string,
  iconType?: string,
  children?: IMenuItem[]
}

const { Sider } = Layout
const { Item, SubMenu } = Menu

let menuItemsArray: IMenuItem[] = [
  {
    content: titles.dashboard,
    iconType: 'dashboard',
    url: dashboardRoutes.dashboardPage
  },
  {
    content: titles.transfers,
    iconType: 'transaction',
    url: dashboardRoutes.transfersPage
  },
  {
    content: titles.giveKudos,
    iconType: 'like',
    url: dashboardRoutes.giveKudosPage
  }
]

const renderSubMenu = (menuItem: IMenuItem) => {
  const { content, iconType, url, children } = menuItem
  if (children && children.length > 0) {
    return (
      <SubMenu key={url} title={
        <span>
          {iconType && <Icon type={iconType} />}
          {content}
        </span>
      }
      >
        {children.map(renderSubMenu)}
      </SubMenu>
    )
  }

  return (
    <Item key={url}>
      <Link to={url}>
        <Icon type={iconType} />
        <span>{content}</span>
      </Link>
    </Item>
  )
}

const SidebarLayout: React.FC<RouteComponentProps> = (props) => {
  const [menuItems, setMenuItems] = useState(menuItemsArray)

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      let { userRole: { is_admin } } = store.getState()
      if (is_admin)
        setMenuItems(
          menuItems.concat([
            {
              children: [
                {
                  content: titles.list,
                  iconType: 'unordered-list',
                  url: dashboardRoutes.giftsManagementPage
                },
                {
                  content: titles.requests,
                  iconType: 'ordered-list',
                  url: dashboardRoutes.giftRequestsPage
                }
              ],
              content: titles.gifts,
              iconType: 'gift',
              url: dashboardRoutes.giftsManagementPage
            },
            {
              content: titles.team,
              iconType: 'user',
              url: dashboardRoutes.teamManagementPage
            },
            {
              content: titles.settings,
              iconType: 'setting',
              url: dashboardRoutes.settingPage
            }
          ])
        )
    })

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  const activeRoute = props.location.pathname

  return (
    <Sider
      width={250}
      className="sidebar-container"
    >
      <div className="logo-container">
        <h1>Open Kudos </h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[activeRoute]}
      >
        {
          menuItems.map(item => renderSubMenu(item))
        }
      </Menu>
    </Sider>
  )
}

export default withRouter(SidebarLayout)
