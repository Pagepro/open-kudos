import { notification, Table } from 'antd'
import { PaginationConfig } from 'antd/lib/table'
import axios from 'axios'
import React, { useCallback, useEffect, useReducer } from 'react'
import { IPaginatedListProps, IPaginatedResponse, IWithKey } from '../models'
import ActionTypes from './actionTypes'
import reducer, { paginatedListInitialState } from './reducer'


const PaginatedList = <T extends IWithKey>(props: IPaginatedListProps<T>) => {

  const { endpoint, pageSize, columns } = props
  const rowKey = '_id'

  const [state, dispatch] = useReducer(reducer, paginatedListInitialState)

  const fetchGifts = useCallback(async (skip: number, take: number) => {

    dispatch({
      type: ActionTypes.FETCH_DATA_REQUEST
    })

    try {
      const { data: { docs, total } } = await axios.get<IPaginatedResponse<T>>(
        endpoint, {
          params: { skip, take }
        })

      dispatch({
        payload: { dataSource: docs, total },
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

  const handleTableChange = useCallback((pagination: PaginationConfig) => {
    const limit = pagination.pageSize || 0
    const current = pagination.current || 1
    const skip = (current - 1) * limit
    fetchGifts(skip, limit)
  }, [fetchGifts])

  useEffect(() => {
    fetchGifts(0, pageSize || 10)
  }, [fetchGifts, pageSize])

  return (
    <Table<T>
      {...state}
      columns={columns}
      onChange={handleTableChange}
      rowKey={record => record[rowKey]}
    />
  )
}

export default PaginatedList
