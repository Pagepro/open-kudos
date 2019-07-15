import { ColumnProps } from 'antd/lib/table'

export interface IPaginatedListProps<T> {
  columns: ColumnProps<T>[],
  endpoint: string,
  pageSize?: number,
}
