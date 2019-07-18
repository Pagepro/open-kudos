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

  const fetchGifts = useCallback(async (
    skip: number,
    take: number = 10,
    current: number = 1
  ) => {
    dispatch({
      type: ActionTypes.FETCH_DATA_REQUEST
    })

    try {
      const { data: { docs, total } } = await axios.get<IPaginatedResponse<T>>(
        endpoint, {
          params: { skip, take }
        }
      )

      dispatch({
        payload: { dataSource: docs, total, current },
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
    const limit = pagination.pageSize || 10
    const current = pagination.current || 1
    const skip = (current - 1) * limit

    fetchGifts(skip, limit, current)
  }, [fetchGifts])

  useEffect(() => {
    fetchGifts(0, pageSize || 10)
  }, [fetchGifts, pageSize])


  if (getAPIRef) {
    getAPIRef.current = {

      refetchData: () => {
        const { pagination } = state
        if (pagination) {
          const current = pagination.current || 1
          const skip = (current - 1) * (pageSize || 10)
          fetchGifts(skip, pageSize, current)
        } else {
          fetchGifts(0, pageSize || 10)
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
