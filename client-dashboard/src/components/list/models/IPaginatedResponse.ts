export interface IPaginatedResponse<T> {
  docs: T[],
  total: number,
  limit?: number,
  offset?: number,
}
