/// <reference types="mongoose" />

declare module 'mongoose' {
  import mongoose = require('mongoose');

  export interface PaginateOptions {
    sort?: Object | string,
    page?: number,
    limit?: number
  }

  export interface PaginateResult<T> {
    docs: Array<T>,
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

  interface PaginateModel<T extends Document> extends Model<T> {
    aggregatePaginate(aggregation?: mongoose.Aggregate<any>, options?: PaginateOptions, callback?: (err: any, result: PaginateResult<T>) => void): Promise<PaginateResult<T>>;
  }

  export function model<T extends Document>(
    name: string,
    schema?: Schema,
    collection?: string,
    skipInit?: boolean): PaginateModel<T>;

  export function model<T extends Document, U extends PaginateModel<T>>(
    name: string,
    schema?: Schema,
    collection?: string,
    skipInit?: boolean): U;
}

declare module 'mongoose-aggregate-paginate-v2' {
  import mongoose = require('mongoose');
  var _: (schema: mongoose.Schema) => void;
  export = _;
}
