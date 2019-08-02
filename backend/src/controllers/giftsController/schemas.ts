import { Schema } from 'express-validator'
import CommonConst from '../../common/consts/common';
import { IFile } from './models'

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
    optional: {
      nullable: true
    }
  },
  name: {
    isString: {
      errorMessage: 'Gift name is required'
    }
  },
  files: {
    custom: {
      options: (value, { req, location, path }) => {
        const file: IFile = req.file

        if (file) {
          return file.size <= CommonConst.allowedImageSize
        }
      },
      errorMessage: 'File to large.'
    }
  }
}

export const GiftsPaginationSchema: Schema = {
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
