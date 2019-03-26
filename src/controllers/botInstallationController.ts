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
import UserService from '../common/services/user'
import WorkspaceService from '../common/services/workspace'
import { IWorkspace } from '../models/workspace.model'

@Controller('/installation')
export default class BotInstallationController {
  @Get('/')
  public async install(
    @RequestDecorator() req: Request,
    @ResponseDecorator() res: Response
  ) {
    const response = await this.getVerificationInformation(req)
    const workspace = this.getWorkspaceFromResponse(response)
    const workspaceService = new WorkspaceService()
    const userService = new UserService()

    try {
      const workspaceInitiated = workspaceService.create(workspace)
      const usersInitiated = userService.initUsers(workspace)
      if (workspaceInitiated && usersInitiated) {
        res.end('Workspace created')
      }
    } catch (error) {
      res.send(error)
    }
  }

  private async getVerificationInformation(req: Request) {
    const { data } = await axios.get(SlackConsts.slackAuthUrl, {
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
