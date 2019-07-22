import { Divider, notification, PageHeader, Spin } from 'antd'
import axios from 'axios'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pageTitles } from '../../setup/messages'
import { IGlobalState } from '../../setup/reducers'
import { getChannels, IChannel } from './actions'
import ISettings from './models/ISettings'
import SettingsForm from './SettingsForm'

const SettingsPage: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState(String.empty)
  const [loading, setLoading] = useState(false)
  const endpoint = '/api/settings'

  const dispatch = useDispatch()

  const onSubmit = useCallback(async (settings: ISettings) => {
    const { channelId } = settings

    setLoading(true)

    try {
      await axios.post<ISettings>(endpoint, { channelId })
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
    const { data } = await axios.get('/api/settings/botResponseChannel')
    const { botResponseChannelId } = data
    setSelectedChannel(botResponseChannelId)
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
          onSubmit={onSubmit}
        />
      </Spin>
    </Fragment>
  )
}
export default SettingsPage
