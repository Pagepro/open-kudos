import { notification, Table } from 'antd'
import { PaginationConfig } from 'antd/lib/table'
import axios from 'axios'
import React, { useCallback, useEffect, useReducer } from 'react'
import { IPaginatedListProps, IPaginatedResponse, IWithKey } from '../models'
import ActionTypes from './actionTypes'
import createReducer, { paginatedListInitialState } from './reducer'


const PaginatedList = <T extends IWithKey>(props: IPaginatedListProps<T>) => {
  const { endpoint, pageSize, columns, getAPIRef } = props
  const rowKey = '_id'

  const [state, dispatch] = useReducer(
    createReducer<T>(),
    paginatedListInitialState<T>()
  )

  const fetchData = useCallback(async (
    limit: number = 10,
    page: number = 1,
    sortOrder?: string,
    sortColumn?: string
  ) => {
    dispatch({
      type: ActionTypes.FETCH_DATA_REQUEST
    })

    try {
      const {
        data: {
          docs,
          totalDocs
        }
      } = await axios.get<IPaginatedResponse<T>>(endpoint, {
        params: { limit, page, sortOrder, sortColumn }
      })

      dispatch({
        payload: {
          current: page,
          dataSource: docs,
          pageSize: limit,
          total: totalDocs
        },
        type: ActionTypes.FETCH_DATA_SUCCESS
      })
    } catch (error) {
      dispatch({
        type: ActionTypes.FETCH_DATA_FAIL
      })

      notification.error({
        message: 'Something went wrong',
      })
    }
  }, [endpoint])

  const handleTableChange = useCallback((
    pagination: PaginationConfig,
    filters,
    sorter
  ) => {
    const limit = pagination.pageSize || 10
    const current = pagination.current || 1
    const sortOrder = sorter.order ? sorter.order : 'ascend'
    const sortColumn = sorter.field ? sorter.field : String.empty

    fetchData(limit, current, sortOrder, sortColumn)
  }, [fetchData])

  useEffect(() => {
    fetchData(pageSize || 10, 1)
  }, [fetchData, pageSize])


  if (getAPIRef) {
    getAPIRef.current = {
      refetchData: () => {
        const { pagination } = state

        if (pagination) {
          const current = pagination.current || 1

          fetchData(pageSize, current)
        } else {
          fetchData(0, pageSize || 10)
        }
      }
    }
  }

  return (
    <Table<T>
      {...state}
      columns={columns}
      onChange={handleTableChange}
      rowKey={(record: T) => record[rowKey]}
    />
  )
}

export default PaginatedList
