import {
  Controller,
  Get,
  Post,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import { Request, Response } from 'express'
import SlackConsts from '../../common/consts/slack'
import WorkspaceService from '../../common/services/workspace'
import AuthMiddleware from '../../middleware/authMiddleware'
import { IUserEnhancedRequest } from '../../middleware/definitions/authMiddleware'

@Controller('/settings')
export default class SettingsController {
  private workspaceService = new WorkspaceService()

  @Get('/bot', [AuthMiddleware])
  public async getBotResponseChannelId(
    @RequestDecorator() req: IUserEnhancedRequest,
    @ResponseDecorator() res: Response
  ) {
    const { team_id } = req.user
    const [
      botResponseChannelId,
      monthlyKudosAmount,
      giftRequestsReceiver
    ] = await Promise.all([
      this.workspaceService.getResponseBotChannelId(team_id),
      this.workspaceService.getKudosMonthlyAmount(team_id),
      this.workspaceService.getGiftRequestsReceiver(team_id)
    ])

    res.json({
      botResponseChannelId,
      giftRequestsReceiver,
      monthlyKudosAmount,
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
    try {
      this.workspaceService.updateSetting(team_id, req.body)
      res.status(200).send()
    } catch (error) {
      res.status(500).send('Something went wrong')
    }

  }
}
