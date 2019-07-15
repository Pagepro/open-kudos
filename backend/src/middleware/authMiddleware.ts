import {
  Middleware,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import { NextFunction, Request, Response } from 'express'
import AuthService from '../common/services/auth'
import SlackClientService from '../common/services/slackClient'
import { IUserEnhancedRequest } from './definitions/authMiddleware'

export default class AuthMiddleware implements Middleware {
  private slackClientService = new SlackClientService()
  private authService = new AuthService()

  public async use(
    @RequestDecorator() req: IUserEnhancedRequest,
    @ResponseDecorator() res: Response,
    next: NextFunction
  ): Promise<void> {
    const { authorization } = req.headers
    const { ok, team_id, user_id, user } =
      await this.authService.checkAuth(authorization)

    if (ok) {
      req.user = {
        team_id,
        user,
        user_id
      }

      return next()
    }

    res.status(401).send("unauthorized")
  }
}
