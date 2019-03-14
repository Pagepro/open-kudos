import {
  Controller,
  Get,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import axios from 'axios'
import { Request, Response } from 'express'
import { slackOauthUrl } from '../config/const'

@Controller('/installation')
export default class BotInstallationController {
  @Get('/')
  public async install(@RequestDecorator() req: Request, @ResponseDecorator() res: Response) {
    // tslint:disable-next-line:no-console
    const response = await axios.get(slackOauthUrl, {
      params: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
      }
    })
    // tslint:disable-next-line:no-console
    console.log(response)
    res.end('Success')
  }
}
