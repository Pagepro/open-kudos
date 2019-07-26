export interface IListActionPayload<T> {
  current: number,
  dataSource: T[],
  total: number,
  pageSize: number
}
