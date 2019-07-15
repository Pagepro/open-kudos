import { ColumnProps } from 'antd/lib/table'

export interface IPaginatedListProps<T> {
  columns: Array<ColumnProps<T>>,
  endpoint: string,
  pageSize?: number,
}
