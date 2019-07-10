import {
  Controller,
  Get,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import { Request, Response } from 'express'
import SlackConsts from '../common/consts/slack'

@Controller('/settings')
export default class SettingsController {
  @Get('/')
  public dashboardPage(
    @RequestDecorator() req: Request,
    @ResponseDecorator() res: Response
  ) {
    res.json({ slackInstalHref: SlackConsts.slackInstallLink })
  }
}
