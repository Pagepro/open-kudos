import { Divider, PageHeader } from 'antd'
import React from 'react'
import { pageTitles } from '../../setup/messages'

const GiftPage: React.FC = () =>
  <>
    <PageHeader title={pageTitles.gifts} />
    <Divider />
    <p>Gifts content</p>
  </>

export default GiftPage
