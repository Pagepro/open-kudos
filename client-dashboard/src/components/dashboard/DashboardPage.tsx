import { Divider, PageHeader } from 'antd'
import React, { Fragment } from 'react'
import { titles } from '../../setup/messages'

const DashboardPage: React.FC = () => {
  return (
    <Fragment>
      <PageHeader title={titles.dashboard} />
      <Divider />
      <p>Dashboard content</p>
    </Fragment>
  )
}
export default DashboardPage
