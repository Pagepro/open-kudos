import { Divider, notification, PageHeader } from 'antd'
import Axios from 'axios'
import { SubmissionErrors } from 'final-form'
import React, { Fragment, useCallback, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IPostRequestError } from '../../common/models'
import { dashboardRoutes } from '../../setup/config'
import { pageTitles } from '../../setup/messages'
import GiftForm from './GiftForm'
import { IGift } from './models'

const NewGiftPage: React.FC<RouteComponentProps> = ({ history }) => {
  const [loading, setLoading] = useState(false)

  const onFormSubmit = useCallback(async (gift: IGift) => {
    const { name, cost, description, files } = gift
    const data = new FormData()
    const file = files ? files[0] : null

    data.set('cost', cost.toString())
    data.set('description', description)
    data.set('name', name)

    if (file) {
      data.append('file', file)
    }

    const endpoint = '/api/gifts'

    setLoading(true)

    try {
      await Axios({
        data,
        headers:
          { 'Content-Type': `multipart/form-data` },
        method: 'post',
        url: endpoint,
      })

      setLoading(false)
      history.push(dashboardRoutes.giftsManagementPage)
      notification.success({
        message: 'Gift has been added'
      })
    } catch (err) {
      setLoading(false)

      const errors: IPostRequestError[] = err.response.data

      return errors.reduce(
        (obj: SubmissionErrors, item: IPostRequestError) => {
          obj[item.param] = item.msg
          return obj
        }, {})
    }
  }, [history])

  const onCancel = useCallback(() => {
    history.push(dashboardRoutes.giftsManagementPage)
  }, [history])

  return (
    <Fragment>
      <PageHeader title={pageTitles.newGift} />
      <Divider />
      <GiftForm
        loading={loading}
        onCancel={onCancel}
        onSubmit={onFormSubmit}
      />
    </Fragment>
  )
}
export default NewGiftPage
