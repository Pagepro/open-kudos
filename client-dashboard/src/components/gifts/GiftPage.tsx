import { Divider, PageHeader } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { pageTitles } from '../../setup/messages'
import axios from 'axios';

const GiftPage: React.FC = () => {
  const [gifts, setGifts] = useState([])

  useEffect(() => {
    const fetchGifts = async () => {
      const { data: { gifts } } = await axios.get('/api/gifts');
      setGifts(gifts)
    };

    fetchGifts();
  }, [])

  return (
    <Fragment>
      <PageHeader title={pageTitles.gifts} />
      <Divider />
      <p>Gifts content</p>
      {gifts.map(gift => (<p key={gift}>{gift}</p>))}
    </Fragment>
  )
}
export default GiftPage
