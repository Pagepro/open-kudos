import {
  Middleware,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import { NextFunction, Request, Response } from 'express'
import AuthService from '../common/services/auth'
import LoggerService from '../common/services/logger'
import { IUserEnhancedRequest } from './definitions/authMiddleware'

export default class AuthMiddleware implements Middleware {
  private authService = new AuthService()
  private logger = new LoggerService()

  public async use(
    @RequestDecorator() req: IUserEnhancedRequest,
    @ResponseDecorator() res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { authorization } = req.headers
      const {
        ok: authReqOk,
        team_id,
        user_id,
        user
      } = await this.authService.checkAuth(authorization)

      const {
        ok: workspaceRoleReqOk,
        user: {
          is_admin, is_owner, is_primary_owner
        }
      } = await this
        .authService
        .getWorkspaceRole(team_id, user_id)

      const userRoleIsValid =
        workspaceRoleReqOk && is_admin || is_owner || is_primary_owner

      if (authReqOk && userRoleIsValid) {
        req.user = {
          team_id,
          user,
          user_id
        }

        return next()
      }

      res.status(401).send("unauthorized")
    } catch ({ message }) {
      this.logger.logError(message)
      res.status(401).send("unauthorized")
    }
  }
}
