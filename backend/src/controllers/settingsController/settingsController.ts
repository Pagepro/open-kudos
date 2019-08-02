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
import ISettings from './models/ISettings'

@Controller('/settings')
export default class SettingsController {
  private settingsService = new SettingsService()
  private slackService = new SlackClientService()

  @Get('/bot', [AuthMiddleware])
  public async getBotResponseChannelId(
    @RequestDecorator() req: IUserEnhancedRequest,
    @ResponseDecorator() res: Response
  ) {
    const { team_id } = req.user
    const [
      botResponseChannelId,
      monthlyKudosAmount
    ] = await Promise.all([
      this.slackService.getResponseBotChannelId(team_id),
      this.settingsService.getKudosMonthlyAmount(team_id)
    ])

    res.json({
      botResponseChannelId,
      monthlyKudosAmount
    })
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
    const settings: ISettings = req.body
    const { botResponseChannelId } = settings

    try {
      this.settingsService.updateWorkspaceSettings(team_id, settings)
      this.slackService.setBotResponseChannel(team_id, botResponseChannelId)

      res.status(200).send()
    } catch (error) {
      res.status(500).send('Something went wrong')
    }
  }
}
