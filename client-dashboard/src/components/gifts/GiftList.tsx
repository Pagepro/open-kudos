import React from 'react'
import { Divider } from 'antd'
import { TableProps, ColumnProps } from 'antd/lib/table'
import { IGift } from './models'
import PaginatedList from '../list/PaginatedList'

const columns: ColumnProps<IGift>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name'
  },
  {
    key: 'description',
    title: 'Description',
    dataIndex: 'description'
  },
  {
    key: 'cost',
    title: 'Cost',
    dataIndex: 'cost'
  },
  {
    title: 'Options',
    key: 'action',
    render: () => (
      <span>
        <span>Edit</span>
        <Divider type="vertical" />
        <span className="text-danger">Delete</span>
      </span>
    ),
  }
]

const endpoint = `/api/gifts`

export const GiftList: React.FC<TableProps<IGift>> = () => (
  <PaginatedList<IGift>
    columns={columns}
    endpoint={endpoint}
    pageSize={10}
  />
)
