import {
  Controller,
  Get,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import { Request, Response } from 'express'
import AuthService from '../common/services/auth'

@Controller('/')
export default class AuthController {
  private authService = new AuthService()

  @Get('/')
  public async auth(
    @RequestDecorator() req: Request,
    @ResponseDecorator() res: Response
  ) {
    try {
      const slackCode = req.query.code
      const response = await this.authService.login(slackCode)
      const { data: { ok, access_token } } = response

      if (ok) {
        res.redirect(`/auth/success/${access_token}`)
      } else {
        res.redirect('/login')
      }
    } catch (error) {
      res.status(401).send("unauthorized")
    }
  }
}
