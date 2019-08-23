import { Divider, PageHeader } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'
import React, { Fragment } from 'react'
import { titles } from '../../setup/messages'
import PaginatedList from '../list/PaginatedList'
import { ITransfer } from './models/ITransfer'

const TransfersPage: React.FC = () => {
  const endpoint = `/api/transfers`

  const columns: Array<ColumnProps<ITransfer>> = [
    {
      dataIndex: 'date',
      key: 'date',
      render: text => moment(text).format('lll'),
      title: 'Date',
    },
    {
      dataIndex: 'senderName',
      key: 'sender',
      title: 'Sender'
    },
    {
      dataIndex: 'receiverName',
      key: 'receiver',
      title: 'Receiver'
    },
    {
      dataIndex: 'value',
      key: 'value',
      title: 'Value'
    },
    {
      dataIndex: 'comment',
      key: 'comment',
      title: 'Message'
    }
  ]

  return (
    <Fragment>
      <PageHeader
        title={titles.transfers}
      />
      <Divider />
      <PaginatedList<ITransfer>
        columns={columns}
        endpoint={endpoint}
        pageSize={10}
      />
    </Fragment>
  )
}

export default TransfersPage
