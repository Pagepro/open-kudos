import { Divider, notification, PageHeader, Spin } from 'antd'
import axios from 'axios'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { common } from '../../setup/const';
import { pageTitles } from '../../setup/messages'
import { IGlobalState } from '../../setup/reducers'
import { getChannels, IChannel } from './actions'
import ISettings from './models/ISettings'
import SettingsForm from './SettingsForm'

const SettingsPage: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState(String.empty)
  const [monthlyKudosAmount, setMonthlyKudosAmount] =
    useState(common.defaultKudosAmount)
  const [loading, setLoading] = useState(false)
  const endpoint = '/api/settings'

  const dispatch = useDispatch()

  const onSubmit = useCallback(async (settings: ISettings) => {
    setLoading(true)

    try {
      await axios.post<ISettings>(endpoint, settings)
      setLoading(false)
      notification.success({
        message: 'Settings have been saved'
      })
    } catch (error) {
      setLoading(false)
      notification.error({
        message: 'Something went wrong'
      })
    }
  }, [])

  const getBotResponseChannelId = async () => {
    setLoading(true)
    const { data } = await axios.get('/api/settings/bot')
    const { monthlyKudosAmount, botResponseChannelId } = data
    setSelectedChannel(botResponseChannelId)
    setMonthlyKudosAmount(monthlyKudosAmount)
    setLoading(false)
  }

  useEffect(() => {
    getChannels()(dispatch)
    getBotResponseChannelId()
  }, [dispatch])

  const allChannels =
    useSelector<IGlobalState, IChannel[]>(({ channels }) => channels)

  const allChannelsOptions = allChannels.map(({ id, name }) => ({
    label: name,
    value: id
  }))

  return (
    <Fragment>
      <PageHeader title={pageTitles.settings} />
      <Divider />
      <Spin spinning={loading}>
        <SettingsForm
          allChannels={allChannelsOptions}
          botResponseChannelId={selectedChannel}
          monthlyKudosAmount={monthlyKudosAmount}
          onSubmit={onSubmit}
        />
      </Spin>
    </Fragment>
  )
}
export default SettingsPage
