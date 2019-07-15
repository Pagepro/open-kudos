import { notification, Table } from 'antd'
import { TableProps } from 'antd/lib/table'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { IPaginatedListProps, IPaginatedResponse, IWithKey } from './models'

const PaginatedList = <T extends IWithKey>(props: IPaginatedListProps<T>) => {

  const { endpoint, pageSize, columns } = props
  const rowKey = '_id'

  const [tableSettings, setTableSettings] = useState<TableProps<T>>({
    dataSource: [],
    loading: false,
    pagination: {
      pageSize,
      total: 0
    }
  })

  const fetchGifts = useCallback(async (skip, take) => {
    setTableSettings(tSettings =>({
      ...tSettings,
      loading: true
    }))
    let items: T[] = []
    let totalItems = 0
    try {
      const { data } = await axios.get<IPaginatedResponse<T>>(
        endpoint, {
        params: { skip, take }
      })
      items = data.docs
      totalItems = data.total
    } catch (error) {
      notification.error({
        message: 'Something went wrong',
      })
    } finally {
      setTableSettings(tSettings => ({
        ...tSettings,
        dataSource: items,
        loading: false,
        pagination: {
          ...tSettings.pagination,
          total: totalItems
        }
      }))
    }
  }, [endpoint])

  const handleTableChange = useCallback((pagination) => {
    const skip = (pagination.current - 1) * pagination.pageSize
      fetchGifts(skip, pagination.pageSize)
    }, [fetchGifts]
  )

  useEffect(() => {
    fetchGifts(0, pageSize)
  }, [fetchGifts, pageSize])

  return (
    <Table<T>
      {...tableSettings}
      columns={columns}
      onChange={handleTableChange}
      rowKey={record => record[rowKey]}
    />
  )
}

export default PaginatedList
