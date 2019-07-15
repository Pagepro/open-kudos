import React, { Fragment } from 'react'
import { Divider, PageHeader } from 'antd'
import { pageTitles } from '../../setup/messages'
import { GiftList } from './GiftList'


const GiftPage: React.FC = () => {

  return (
    <Fragment>
      <PageHeader title={pageTitles.gifts} />
      <Divider />
      <GiftList />
    </Fragment>
  )
}
export default GiftPage
