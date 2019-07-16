import { TableProps } from 'antd/lib/table'
import { IAction } from '../models/IAction'
import ActionTypes from './actionTypes'

const paginatedListInitialState: TableProps<any> = {
  dataSource: [],
  loading: false,
  pagination: {
    pageSize: 0,
    total: 0
  }
}

type PaginatedListReducer = React.Reducer<TableProps<any>, IAction<any>>

const paginatedListReducer: PaginatedListReducer = <T extends {}>(
  state: TableProps<T>,
  action: IAction<T>
) => {
  const { type, payload } = action
  switch(type) {
    case ActionTypes.FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ActionTypes.FETCH_DATA_SUCCESS:
      const { dataSource, total } = payload !
      return {
        ...state,
        dataSource,
        loading: false,
        pagination: {
          ...state.pagination,
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
          total: 0
        }
      }
    default:
      return paginatedListInitialState
  }
}

export {
  paginatedListInitialState
}

export default paginatedListReducer
