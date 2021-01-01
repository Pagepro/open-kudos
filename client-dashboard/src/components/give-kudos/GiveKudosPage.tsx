import { Divider, PageHeader } from 'antd'
import React, { Fragment } from 'react'
import { titles } from '../../setup/messages'

const GiveKudosPage: React.FC = () => {
  return (
    <Fragment>
      <PageHeader title={titles.giveKudos} />
      <Divider />
      <p>Give Kudos content</p>
    </Fragment>
  )
}
export default GiveKudosPage
