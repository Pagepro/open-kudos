import { Divider, PageHeader } from 'antd'
import React, { Fragment } from 'react'
import { pageTitles } from '../../setup/messages'
import ChanelCard from './ChannelCard'

const SettingsPage: React.FC = () => {
  return (
    <Fragment>
      <PageHeader title={pageTitles.settings} />
      <Divider />
      <ChanelCard />
    </Fragment>
  )
}
export default SettingsPage
