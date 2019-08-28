import { Button, Divider, Modal, notification } from 'antd'
import { ColumnProps, TableProps } from 'antd/lib/table'
import axios from 'axios'
import React, { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { IPaginatedListAPI } from '../list/models/IPaginatedListAPI'
import PaginatedList from '../list/PaginatedList'
import { IGift } from './models'


export const GiftList: React.FC<TableProps<IGift>> = () => {
  const endpoint = `/api/gifts`
  const listRef = useRef<IPaginatedListAPI>(null)

  const removeGift = useCallback(async (id: string) => {
    try {
      await axios.delete(`${endpoint}/${id}`)

      const { current } = listRef

      if (current) {
        current.refetchData()
      }
    } catch (error) {
      notification.error({
        message: 'Something went wrong',
      })
    }
  }, [endpoint])

  const showRemoveGiftModal = useCallback((record: IGift) => {
    Modal.confirm({
      cancelText: 'No',
      content: 'You won\'t be able to revert the gift.',
      okText: 'Yes',
      okType: 'danger',
      onOk() {
        removeGift(record._id)
      },
      title: `Are you sure to delete ${record.name}`
    })
  }, [removeGift])

  const renderListItemOptions = useCallback((_, record: IGift) => {
    return (
      <div>
        <Button type='link' className="px-0">
          <Link to={`gifts/${record._id}`}>
            Edit
          </Link>
        </Button>
        <Divider type="vertical" />
        <Button
          type='link'
          className="text-danger px-0"
          onClick={() => { showRemoveGiftModal(record) }}
        >
          Delete
        </Button>
      </div>
    )
  }, [showRemoveGiftModal])

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
      dataIndex: 'amount',
      key: 'amount',
      title: 'Stock'
    },
    {
      dataIndex: 'cost',
      key: 'cost',
      title: 'Cost'
    },
    {
      key: 'action',
      render: renderListItemOptions,
      title: 'Options'
    }
  ]

  return (
    <PaginatedList<IGift>
      columns={columns}
      endpoint={endpoint}
      pageSize={10}
      getAPIRef={listRef}
    />
  )
}
