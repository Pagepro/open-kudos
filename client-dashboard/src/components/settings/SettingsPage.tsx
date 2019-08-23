import { Divider, notification, PageHeader, Spin } from 'antd'
import axios from 'axios'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { common } from '../../setup/const'
import { titles } from '../../setup/messages'
import { IGlobalState } from '../../setup/reducers'
import { getAdmins, getChannels } from './actions'
import ISettings from './models/ISettings'
import { ISettingsState } from './models/ISettingsState'
import SettingsForm from './SettingsForm'

const SettingsPage: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState(String.empty)
  const [monthlyKudosAmount, setMonthlyKudosAmount] =
    useState(common.defaultKudosAmount)
  const [giftRequestsReceiver, setGiftRequestsReceiver] = useState(String.empty)
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
    const {
      monthlyKudosAmount,
      botResponseChannelId,
      giftRequestsReceiver
    } = data

    setSelectedChannel(botResponseChannelId)
    setMonthlyKudosAmount(monthlyKudosAmount)
    setGiftRequestsReceiver(giftRequestsReceiver)
    setLoading(false)
  }

  useEffect(() => {
    getChannels()(dispatch)
    getAdmins()(dispatch)
    getBotResponseChannelId()
  }, [dispatch])

  const {channels, admins } =
    useSelector<IGlobalState, ISettingsState>(({ settings }) => settings)

  const allChannelsOptions = channels.map(({ id, name }) => ({
    label: name,
    value: id
  }))

  const allAdminsOptions = admins.map(({ userId, name }) => ({
    label: name,
    value: userId
  }))

  return (
    <Fragment>
      <PageHeader title={titles.settings} />
      <Divider />
      <Spin spinning={loading}>
        <SettingsForm
          allAdmins={allAdminsOptions}
          allChannels={allChannelsOptions}
          botResponseChannelId={selectedChannel}
          monthlyKudosAmount={monthlyKudosAmount}
          giftRequestsReceiver={giftRequestsReceiver}
          onSubmit={onSubmit}
        />
      </Spin>
    </Fragment>
  )
}
export default SettingsPage
