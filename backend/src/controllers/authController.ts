import {
  Controller,
  Get,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import { Request, Response } from 'express'
import AuthService from '../common/services/auth'
import LoggerService from '../common/services/logger'

@Controller('/')
export default class AuthController {
  private authService = new AuthService()
  private logger = new LoggerService()

  @Get('/')
  public async auth(
    @RequestDecorator() req: Request,
    @ResponseDecorator() res: Response
  ) {
    try {
      const { code: slackCode } = req.query
      console.log(`slackCode===>`, slackCode, `---slackCode`);
      const x = await this.authService
        .login(slackCode);
      console.log(`x===>`, x, `---x`);
      const { ok, access_token } = x;

      if (ok) {
        res.redirect(`/auth/success/${access_token}`)
      } else {
        res.redirect('/login')
      }
    } catch (error) {
      res.status(401).send("unauthorized")
    }
  }

  @Get('/logout')
  public async logout(
    @RequestDecorator() req: Request,
    @ResponseDecorator() res: Response
  ) {
    try {
      const token = req.headers.authorization
      const { ok, error } = await this.authService.logout(token)

      if (!ok) {
        this.logger.logError(error)
      }

      res.redirect(`/login`)
    } catch (error) {
      this.logger.logError(error)
      res.status(500)
    }
  }
}
