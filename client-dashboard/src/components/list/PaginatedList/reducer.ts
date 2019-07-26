import { TableProps } from 'antd/lib/table'
import { IAction } from '../../../common/models/IAction'
import { IListActionPayload } from '../models/IListActionPayload'
import ActionTypes from './actionTypes'

const paginatedListInitialState = <T>(): TableProps<T> => {
  return {
    dataSource: [],
    loading: false,
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0
    }
  }
}

const createPaginatedListReducer = <T>() => (
  state = paginatedListInitialState<T>(),
  action: IAction<IListActionPayload<T>>
) => {
  const { type, payload } = action

  switch(type) {
    case ActionTypes.FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ActionTypes.FETCH_DATA_SUCCESS:
      const { current, dataSource, pageSize, total } = payload!

      return {
        ...state,
        dataSource,
        loading: false,
        pagination: {
          ...state.pagination,
          current,
          pageSize,
          total
        }
      }
    case ActionTypes.FETCH_DATA_FAIL:
      return {
        ...state,
        dataSource: [],
        loading: false,
        pagination: {
          ...state.pagination,
          current: 0,
          total: 0
        }
      }
    default:
      return paginatedListInitialState<T>()
  }
}

export {
  paginatedListInitialState
}

export default createPaginatedListReducer
