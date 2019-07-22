import {
  Controller,
  Get,
  Post,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import { Request, Response } from 'express'
import SlackConsts from '../../common/consts/slack'
import SettingsService from '../../common/services/settings'
import SlackClientService from '../../common/services/slackClient'
import AuthMiddleware from '../../middleware/authMiddleware'
import { IUserEnhancedRequest } from '../../middleware/definitions/authMiddleware'

@Controller('/settings')
export default class SettingsController {
  private slackClientService = new SlackClientService()
  private settingsService = new SettingsService()

  @Get('/botResponseChannel', [AuthMiddleware])
  public async getBotResponseChannelId(
    @RequestDecorator() req: IUserEnhancedRequest,
    @ResponseDecorator() res: Response
  ) {
    const { team_id } = req.user
    const channelId = await this.slackClientService
      .getResponseBotChannelId(team_id)

    res.json({ botResponseChannelId: channelId })
  }

  @Get('/')
  public getSlackConfig(
    @RequestDecorator() req: Request,
    @ResponseDecorator() res: Response
  ) {
    res.json(
      {
        slackClientId: SlackConsts.slackClientId,
        slackInstalHref: SlackConsts.slackInstallLink,
        slackLoginHref: SlackConsts.slackLoginLink
      }
    )
  }

  @Post('/', [AuthMiddleware])
  public async saveSettings(
    @RequestDecorator() req: IUserEnhancedRequest,
    @ResponseDecorator() res: Response
  ) {
    const { team_id } = req.user
    this.settingsService.save(team_id, req.body)

    res.status(200).send()
  }
}
