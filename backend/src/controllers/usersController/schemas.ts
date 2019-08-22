import { Schema } from 'express-validator'

export const UsersPaginationSchema: Schema = {
  limit: {
    in: 'query',
    isInt: {
      options: {
        max: 50,
        min: 0
      }
    },
    optional: true
  },
  page: {
    in: 'query',
    isInt: {
      options: {
        min: 1
      }
    },
    optional: true
  }
}
