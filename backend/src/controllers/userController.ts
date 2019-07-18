import {
  Controller,
  Get,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import { Response } from 'express'
import AuthMiddleware from '../middleware/authMiddleware'
import { IUserEnhancedRequest } from '../middleware/definitions/authMiddleware'

@Controller('/users', [AuthMiddleware])
export default class UserController {
  @Get('/me')
  public async auth(
    @RequestDecorator() req: IUserEnhancedRequest,
    @ResponseDecorator() res: Response
  ) {
    const { user } = req.user
    res.json({ user })
  }
}
