export interface IAction<T> {
  type: string,
  payload?: {
    dataSource: T[],
    total: number
  }
}
