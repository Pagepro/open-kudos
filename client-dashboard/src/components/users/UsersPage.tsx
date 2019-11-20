import { Button, Divider, PageHeader } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import React, { Fragment } from 'react'
import styled from 'styled-components'
import { getAuthToken } from '../../setup/interceptors/utils'
import { titles } from '../../setup/messages'
import PaginatedList from '../list/PaginatedList'
import { IUser } from './models/IUser'

const HeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const UsersPage: React.FC = () => {
  const endpoint = `/api/users/team`
  const exportEndpoint = `${endpoint}/export?authorization=${getAuthToken()}`

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
      <HeaderRow>
        <PageHeader
          title={titles.team}
        />
        <Button href={exportEndpoint} target="_blank" rel="noopener noreferrer">
          Export
        </Button>
      </HeaderRow>
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
