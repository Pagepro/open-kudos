import { Button, Divider } from 'antd'
import { ColumnProps, TableProps } from 'antd/lib/table'
import React from 'react'
import PaginatedList from '../list/PaginatedList'
import { IGift } from './models'
import { Link } from 'react-router-dom';

const columns: Array<ColumnProps<IGift>> = [
  {
    dataIndex: 'name',
    key: 'name',
    title: 'Name'
  },
  {
    dataIndex: 'description',
    key: 'description',
    title: 'Description'
  },
  {
    dataIndex: 'cost',
    key: 'cost',
    title: 'Cost'
  },
  {
    key: 'action',
    render: (text: any, record: IGift) => (
      <span>
        <Button type='link'>
          <Link to={`gifts/${record._id}`}>
            Edit
          </Link>
        </Button>
        <Divider type="vertical" />
        <span className="text-danger">Delete</span>
      </span>
    ),
    title: 'Options'
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
