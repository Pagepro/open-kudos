import { Schema } from 'express-validator'
import CommonConst from '../../common/consts/common'
import TranslationsService from '../../common/services/translationsService'
import { IFile } from './models'

const translationsService = new TranslationsService()

export const NewGiftSchema: Schema = {
  cost: {
    isInt: {
      errorMessage: translationsService.getTranslation('giftMustBePositiveInt'),
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
      errorMessage: translationsService.getTranslation('giftNameReq')
    }
  },
  files: {
    custom: {
      options: (value, { req, location, path }) => {
        const file: IFile = req.file

        if (file) {
          return file.size <= CommonConst.allowedImageSize
        }

        return true
      },
      errorMessage: translationsService.getTranslation('fileToLarge')
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
