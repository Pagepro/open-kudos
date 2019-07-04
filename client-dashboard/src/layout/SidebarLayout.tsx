import { Icon, Layout, Menu } from 'antd'
import React from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { dashboardRoutes } from '../setup/config'
import { pageTitles } from '../setup/messages'

const { Sider } = Layout
const { Item } = Menu
const menuItems = [
  {
    content: pageTitles.gifts,
    iconType: 'apartment',
    url: dashboardRoutes.giftsManagementPage
  },
  {
    content: pageTitles.title1,
    iconType: 'apartment',
    url: dashboardRoutes.settingPage
  }
]

class SidebarLayout extends React.Component<RouteComponentProps> {
  public render() {

    const activeRoute = this.props.location.pathname

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
            menuItems.map(({ content, iconType, url }) => (
              <Item key={url}>
                <Link to={url}>
                  <Icon type={iconType} />
                  <span>{content}</span>
                </Link>
              </Item>
            ))
          }
        </Menu>
      </Sider>
    )
  }
}

export default withRouter(SidebarLayout)
