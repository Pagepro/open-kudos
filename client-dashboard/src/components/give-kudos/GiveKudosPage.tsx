import { Divider, notification, PageHeader, Spin } from 'antd'
import axios from 'axios'
import React, { Fragment, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeamMembers } from './actions'
import { titles } from '../../setup/messages'
import { IGlobalState } from '../../setup/reducers'
import { IGiveKudosState } from './models/IGiveKudosState'
import GiveKudosForm from './GiveKudosForm'

const GiveKudosPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [kudosReceiver] = useState(String.empty)
  const [kudosAmount] = useState(0)
  const [kudosReason] = useState(String.empty)
  const endpoint = '/api/giveKudos'

  const dispatch = useDispatch()

  const onSubmit = useCallback(async (data) => {
    setLoading(true)
    try {
      await axios.post(endpoint, data)
      setLoading(false)
      notification.success({
        message: 'Kudos sent successfully'
      })
    } catch (error) {
      setLoading(false)
      if (error.response) {
        notification.error({
          message: error.response.data
        })
      } else {
        notification.error({
          message: 'Something went wrong'
        })
      }
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    getTeamMembers()(dispatch)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [dispatch])

  const { teamMembers } =
    useSelector<IGlobalState, IGiveKudosState>(({ giveKudos }) => giveKudos)

  const allTeamMembersOptions = teamMembers.map(({ userId, name }) => ({
    label: name,
    value: userId
  }))

  return (
    <Fragment>
      <PageHeader title={titles.giveKudos} />
      <Divider />
      <Spin spinning={loading}>
        <GiveKudosForm
          teamMembers={allTeamMembersOptions}
          kudosReceiver={kudosReceiver}
          kudosAmount={kudosAmount}
          kudosReason={kudosReason}
          onSubmit={onSubmit}
        />
      </Spin>
    </Fragment>
  )
}
export default GiveKudosPage
