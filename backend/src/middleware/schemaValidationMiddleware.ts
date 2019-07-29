import { Middleware } from '@decorators/express'
import { NextFunction, Response } from 'express'
import { checkSchema, Schema, validationResult } from 'express-validator'
import { IUserEnhancedRequest } from './definitions/authMiddleware'

export const schemaValidatorFatory = (schema: Schema) => {
  return class SchemaValidatorMiddleware implements Middleware {
    public async use(
      req: IUserEnhancedRequest,
      res: Response,
      next: NextFunction
    ): Promise<void> {
      const validationChains = checkSchema(schema)

      await Promise.all(validationChains.map(
        validationChain => validationChain.run(req)
      ))

      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(400).json(errors.array())
      } else {
        next()
      }
    }
  }
}
