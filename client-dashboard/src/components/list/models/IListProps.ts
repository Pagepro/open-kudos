import { ColumnProps } from 'antd/lib/table'
import { RefObject } from 'react'
import { ICustomRefObject } from '../../../common/models/ICustomRefObject'
import { IPaginatedListAPI } from './IPaginatedListAPI'

export interface IPaginatedListProps<T> {
  columns: Array<ColumnProps<T>>,
  endpoint: string,
  pageSize?: number,
  getAPIRef?: ICustomRefObject<IPaginatedListAPI>
}
