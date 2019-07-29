import { Divider, PageHeader } from 'antd'
import React, { Fragment } from 'react'
import { pageTitles } from '../../setup/messages'

const DashboardPage: React.FC = () => {
  return (
    <Fragment>
      <PageHeader title={pageTitles.dashboard} />
      <Divider />
      <p>Dashboard content</p>
    </Fragment>
  )
}
export default DashboardPage
