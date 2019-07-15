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
        <a href="#">Edit</a>
        <Divider type="vertical" />
        <a href="#" className="text-danger">Delete</a>
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
