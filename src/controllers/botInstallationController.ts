import {
  Controller,
  Get,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import axios from 'axios'
import { Request, Response } from 'express'
import Config from '../common/consts/config'
import SlackConsts from '../common/consts/slack'
import { IWorkspace } from '../models/workspace.model'
import UserService from '../services/user'
import WorkspaceService from '../services/workspace'

@Controller('/installation')
export default class BotInstallationController {
  @Get('/')
  public async install(
    @RequestDecorator() req: Request,
    @ResponseDecorator() res: Response
  ) {
    const response = await this.getVerificationInformation(req)
    const workspace = this.getWorkspaceFromResponse(response)
    try {
      const workspaceInitiated = WorkspaceService.create(workspace)
      const usersInitiated = UserService.initUsers(workspace)
      if (workspaceInitiated && usersInitiated) {
        res.end('Workspace created')
      }
    } catch (error) {
      res.send(error)
    }
  }

  private async getVerificationInformation(req: Request) {
    const { data } = await axios.get(SlackConsts.skackAuthUrl, {
      params: {
        client_id: Config.clientId,
        client_secret: Config.clientSecret,
        code: req.query.code,
      }
    })

    return data
  }

  private getWorkspaceFromResponse(response): IWorkspace {
    const {
      team_id,
      team_name,
      access_token,
      bot: {
        bot_user_id,
        bot_access_token
      }
    } = response

    return {
      accessToken: access_token,
      botAccessToken: bot_access_token,
      botUserId: bot_user_id,
      teamId: team_id,
      teamName: team_name
    }
  }
}
