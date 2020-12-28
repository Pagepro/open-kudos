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
      console.log(`authorization===>`, authorization, `---authorization`);
      const x = await this.authService.checkAuth(authorization)
      const {
        ok: authReqOk,
        team_id,
        user_id,
        user
      } = x;
      console.log(`authReqOk===>`, authReqOk, `---authReqOk`);
      console.log(`team_id===>`, team_id, `---team_id`);
      console.log(`user_id===>`, user_id, `---user_id`);
      console.log(`user===>`, user, `---user`);

      const y = await this
        .authService
        .getWorkspaceRole(team_id, user_id)

      const {
        ok: workspaceRoleReqOk,
        user: {
          is_admin, is_owner, is_primary_owner
        }
      } = y
      console.log(`workspaceRoleReqOk===>`, workspaceRoleReqOk, `---workspaceRoleReqOk`);
      console.log(`is_admin===>`, is_admin, `---is_admin`);
      console.log(`is_owner===>`, is_owner, `---is_owner`);
      console.log(`is_primary_owner===>`, is_primary_owner, `---is_primary_owner`);

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
    } catch (err) {
      console.log(`err===>`, err, `---err`);
      const {message} = err
      this.logger.logError(message)
      res.status(401).send("unauthorized")
    }
  }
}
