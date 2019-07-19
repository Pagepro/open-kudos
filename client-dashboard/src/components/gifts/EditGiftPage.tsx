import { Divider, notification, PageHeader, Spin } from 'antd'
import Axios from 'axios'
import { SubmissionErrors } from 'final-form'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IPostRequestError } from '../../common/models'
import { dashboardRoutes } from '../../setup/config'
import { pageTitles } from '../../setup/messages'
import GiftForm from './GiftForm'
import { IGift } from './models'

const EditGiftPage: React.FC<RouteComponentProps<{id: string}>> = (
  { history, match }
) => {
  const { params: { id } } = match
  const [loading, setLoading] = useState(false)
  const [gift, setGift] = useState<IGift>()
  const endpoint = `/api/gifts/${id}`

  const onFormSubmit = useCallback(async (newGift: IGift) => {
    const { name, cost, description } = newGift

    setLoading(true)

    try {
      await Axios.patch<IGift>(
        endpoint, {
          cost,
          description: description || undefined,
          name
        }
      )

      setLoading(false)
      history.push(dashboardRoutes.giftsManagementPage)
      notification.success({
        message: 'Gift has been edited'
      })
    } catch (err) {
      setLoading(false)

      const errors: IPostRequestError[] = err.response.data
      if (Array.isArray(errors)) {
        return errors.reduce(
          (obj: SubmissionErrors, item: IPostRequestError) => {
            obj[item.param] = item.msg
            return obj
          }, {})
      }
    }
  }, [history, endpoint])

  const onCancel = useCallback(() => {
    history.push(dashboardRoutes.giftsManagementPage)
  }, [history])

  const fetchGift = useCallback(async () => {
    try {
      setLoading(true)
      const fetchedGift = await Axios.get<IGift>(endpoint)
      setGift(fetchedGift.data)
      setLoading(false)
    } catch(error) {
      setLoading(false)
      history.push(dashboardRoutes.giftsManagementPage)
      notification.error({
        message: 'Something went wrong',
      })
    }
  }, [endpoint, history])

  useEffect(() => {
    fetchGift()
  }, [fetchGift])

  return (
    <Fragment>
      <PageHeader title={`${pageTitles.editGift} ${gift ? gift.name : ''}`} />
      <Divider />
      <Spin spinning={loading && !gift}>
        <GiftForm
          loading={loading && gift != null}
          onCancel={onCancel}
          onSubmit={onFormSubmit}
          {...gift}
        />
      </Spin>
    </Fragment>
  )
}
export default EditGiftPage
