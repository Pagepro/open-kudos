import {
  Controller,
  Get,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import { Response } from 'express'
import UserService from '../common/services/user'
import AuthMiddleware from '../middleware/authMiddleware'
import { IUserEnhancedRequest } from '../middleware/definitions/authMiddleware'

@Controller('/users', [AuthMiddleware])
export default class UserController {
  private userService = new UserService()

  @Get('/me')
  public async auth(
    @RequestDecorator() req: IUserEnhancedRequest,
    @ResponseDecorator() res: Response
  ) {
    const { user } = req.user
    res.json({ user })
  }

  @Get('/admins')
  public async getAdmins(
    @RequestDecorator() req: IUserEnhancedRequest,
    @ResponseDecorator() res: Response
  ) {
    res.json(
      await this.userService.getAdmins(
        req.user.team_id
      )
    )
  }
}
