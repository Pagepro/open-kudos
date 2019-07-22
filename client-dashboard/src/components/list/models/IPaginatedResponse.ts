export interface IPaginatedResponse<T> {
  docs: T[],
  totalDocs: number,
  limit: number,
  page?: number,
  totalPages: number,
  pagingCounter?: number,
  hasPrevPage: boolean,
  hasNextPage: boolean,
  prevPage?: number,
  nextPage?: number
}
