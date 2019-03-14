import {
  Controller,
  Get,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import axios from 'axios'
import { Request, Response } from 'express'
import { slackOauthUrl } from '../config/const'
import WorkspaceService from '../services/workspace'

@Controller('/installation')
export default class BotInstallationController {
  @Get('/')
  public async install(@RequestDecorator() req: Request, @ResponseDecorator() res: Response) {
    const response = await this.getVerificationInformation(req)
    const workspace = this.getWorkspaceFromResponse(response)
    try {
      const newWorkspace = await WorkspaceService.create(workspace)
      if (newWorkspace) {
        res.end('Workspace created')
      }
    } catch (error) {
      res.send(error)
    }

    res.end('Success')
  }

  private async getVerificationInformation(req: Request) {
    return await axios.get(slackOauthUrl, {
      params: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
      }
    })
  }

  private getWorkspaceFromResponse(response) {
    const {
      team_id,
      active,
      team_name,
      access_token,
      bot: {
        bot_user_id,
        bot_access_token
      }
    } = response.data

    return {
      accessToken: access_token,
      active,
      botAccessToken: bot_access_token,
      botUserId: bot_user_id,
      teamId: team_id,
      teamName: team_name
    }
  }
}
