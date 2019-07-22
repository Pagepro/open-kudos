import { Button, Divider, Modal, notification, PageHeader, Tag } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import Axios from 'axios'
import moment from 'moment'
import React, { Fragment, useCallback, useRef } from 'react'
import { pageTitles } from '../../setup/messages'
import { IPaginatedListAPI } from '../list/models/IPaginatedListAPI'
import PaginatedList from '../list/PaginatedList'
import { IGiftTransfer } from './models/IGiftRequest'

const GiftRequestsPage: React.FC = () => {
  const endpoint = `/api/gifts/requests`
  const listRef = useRef<IPaginatedListAPI>(null)
  const setAsComplete = useCallback(async (id) => {

    try {
      await Axios.patch(`${endpoint}/${id}`, {
        isNewStatus: false
      })

      const { current } = listRef

      if (current) {
        current.refetchData()
      }

      notification.success({message: 'Request has been set as completed'})

    } catch(error) {
      notification.error({message: 'Something went wrong'})
    }
  }, [endpoint])

  const columns: Array<ColumnProps<IGiftTransfer>> = [
    {
      dataIndex: 'giftRequestDate',
      key: 'request-date',
      render: text => moment(text).format('lll'),
      title: 'Date',
    },
    {
      dataIndex: 'giftName',
      key: 'gift-name',
      title: 'Gift name'
    },
    {
      dataIndex: 'giftCost',
      key: 'gift-cost',
      title: 'Gift cost'
    },
    {
      dataIndex: 'userName',
      key: 'gift-receiver',
      title: 'Receiver nickname'
    },
    {
      key: 'status',
      render: ({ isNewStatus }) => {
        const [label, color] = isNewStatus ?
          ['NEW', 'green'] :
          ['COMPLETED', 'geekblue']

        return (
          <Tag color={color}>
            {label}
          </Tag>
        )
      },
      title: 'Status'
    },
    {
      key: 'action',
      render: ({_id, isNewStatus}) => {
        return (
          <Button
            disabled={!isNewStatus}
            onClick={() => Modal.confirm({
              okText: 'Set as completed',
              onOk: () => setAsComplete(_id),
              title: `Are you sure to set request as completed?`
            })}
            size='small'
          >
            Set as completed
          </Button>
        )
      },
      title: 'Actions'
    }
  ]

  return (
    <Fragment>
      <PageHeader
        title={pageTitles.giftRequests}
      />
      <Divider />
      <PaginatedList<IGiftTransfer>
        columns={columns}
        endpoint={endpoint}
        pageSize={10}
        getAPIRef={listRef}
      />
    </Fragment>
  )
}

export default GiftRequestsPage
