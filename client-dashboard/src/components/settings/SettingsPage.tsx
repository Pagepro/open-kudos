import { Divider, PageHeader } from 'antd'
import React, { Fragment } from 'react'
import { pageTitles } from '../../setup/messages'

const SettingsPage: React.FC = () => {
  return (
    <Fragment>
      <PageHeader title={pageTitles.settings} />
      <Divider />
      <p>Settings content</p>
    </Fragment>
  )
}
export default SettingsPage
