import { Divider, PageHeader } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import React, { Fragment } from 'react'
import { titles } from '../../setup/messages'
import PaginatedList from '../list/PaginatedList'
import { IUser } from './models/IUser'

const UsersPage: React.FC = () => {
  const endpoint = `/api/users/team`

  const columns: Array<ColumnProps<IUser>> = [
    {
      dataIndex: 'userName',
      key: 'userName',
      title: 'Name'
    },
    {
      dataIndex: 'kudosSpendable',
      key: 'kudosSpendable',
      title: ' Kudos to Spend',
      sorter: true,
    },
    {
      dataIndex: 'kudosGiveable',
      key: 'kudosGiveable',
      title: 'Kudos to Give',
      sorter: true,
    },
    {
      dataIndex: 'kudosGranted',
      key: 'kudosGranted',
      title: 'Kudos Granted',
      sorter: true,
    }
  ]

  return (
    <Fragment>
      <PageHeader
        title={titles.team}
      />
      <Divider />
      <PaginatedList<IUser>
        columns={columns}
        endpoint={endpoint}
        pageSize={10}
      />
    </Fragment>
  )
}

export default UsersPage
