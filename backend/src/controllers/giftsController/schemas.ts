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
