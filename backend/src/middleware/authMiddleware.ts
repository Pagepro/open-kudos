import {
  Middleware,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import { NextFunction, Request, Response } from 'express'
import AuthService from '../common/services/auth'
import SlackClientService from '../common/services/slackClient'

interface IRequestUser {
  user: {
    team_id: string
    user: string
    user_id: string
  }
}

export default class AuthMiddleware implements Middleware {
  private slackClientService = new SlackClientService()
  private authService = new AuthService()

  public async use(
    @RequestDecorator() req: Request & IRequestUser,
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
