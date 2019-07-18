import { Schema } from 'express-validator'

export const NewGiftSchema: Schema = {
  cost: {
    isInt: {
      errorMessage: 'Gift cost must be a positive integer',
      options: {
        min: 1,
      }
    }
  },
  description: {
    isString: true,
    optional: true,
  },
  name: {
    isString: {
      errorMessage: 'Gift name is required'
    }
  }
}

export const GiftsPaginationSchema: Schema = {
  offset: {
    in: 'query',
    isInt: {
      options: {
        min: 0
      }
    },
    optional: true
  },
  take: {
    in: 'query',
    isInt: {
      options: {
        max: 50,
        min: 0
      }
    },
    optional: true
  }
}
