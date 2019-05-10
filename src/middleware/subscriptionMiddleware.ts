import {
  Middleware,
} from '@decorators/express'
import { NextFunction, Request, Response } from 'express'
import { SlackResponseType } from '../common/factories/definitions/slackCommandHandlerFactory'
import SlackClientService from '../common/services/slackClient'
import SubscriptionService from '../common/services/subscription'
import TranslationsService from '../common/services/translationsService'
import { ISlackCommandInfo } from '../controllers/definitions/slackController'


export default class SubscriptionMiddleware implements Middleware {
  private translationsService = new TranslationsService()
  private subscriptionService = new SubscriptionService()
  private slackClientService = new SlackClientService()
  public async use(
    { body }: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    const slackCommandInfo: ISlackCommandInfo = body
    const {
      team_id: teamId,
      user_id: user,
      channel_id: channel
    } = slackCommandInfo

    if (await this.subscriptionService.checkIfValid(teamId)) {
      next()
    } else {
      response.end()
      this.slackClientService.sendMessage(
        this.translationsService.getTranslation('demoExpired'),
        {
          channel,
          teamId,
          user,
        },
        SlackResponseType.Hidden)
    }
  }
}
