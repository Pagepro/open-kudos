import { Schema } from 'express-validator'

export const GiftTransfersPaginationSchema: Schema = {
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

export const UpdateGiftTransferSchema: Schema = {
  isNewStatus: {
    in: 'body',
    isBoolean: true
  }
}
