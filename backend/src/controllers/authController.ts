import {
  Controller,
  Get,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import axios from 'axios'
import { Request, Response } from 'express'

@Controller('/')
export default class AuthController {
  @Get('/')
  public async auth(
    @RequestDecorator() req: Request,
    @ResponseDecorator() res: Response
  ) {
    try {
      const response = await axios.get('https://slack.com/api/oauth.access', {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code: req.query.code,
          redirect_uri: process.env.SLACK_AUTH_REDIRECT_URI
        }
      })

      if (response.data.ok) {
        res.redirect(`/auth/success/${response.data.access_token}`)
      } else {
        res.redirect('/login')
      }

    } catch (error) {
      res.status(401).send("unauthorized")
    }
  }
}
