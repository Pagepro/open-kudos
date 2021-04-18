import {
  Controller,
  Get,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import { Request, Response } from 'express'
import SlackClientService from '../common/services/slackClient'
import AuthMiddleware from '../middleware/authMiddleware'
import { IUserEnhancedRequest } from '../middleware/definitions/authMiddleware'

@Controller('/channels', [AuthMiddleware])
export default class ChannelsController {
  private slackClientService = new SlackClientService()

  @Get('/')
  public async getAllPublicChannels(
    @RequestDecorator() req: IUserEnhancedRequest,
    @ResponseDecorator() res: Response
  ) {
    const { team_id } = req.user
    const channels = await this.slackClientService
      .getAllConversations(team_id)

    res.send(channels.map(({ id, name }) => ({ id, name })))
  }
}
