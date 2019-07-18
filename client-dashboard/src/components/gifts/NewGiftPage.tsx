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

    const { name, cost, description } = gift
    const endpoint = `/api/gifts`
    setLoading(true)

    try {
      await Axios.post<IGift>(
        endpoint, {
          cost,
          description,
          name
        }
      )
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
