import {
  Controller,
  Post,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import { Request, Response } from 'express'
import SlackActionHandlerFactory from '../../common/factories/slackActionHandlerFactory'
import SlackCommandHandlerFactory from '../../common/factories/slackCommandHandlerFactory'
import { ISlackAction, ISlackActionPayload, ISlackEventInfo, SlackEventSubtype } from '../definitions/slackController'

@Controller('/slack')
export default class SlackController {
  @Post('/events')
  public events(
    @ResponseDecorator() res: Response,
    @RequestDecorator() { body }: Request) {
    const slackEventInfo: ISlackEventInfo = body
    const { challenge, event } = slackEventInfo

    if (challenge) {
      res.send(body).end()
    } else {
      res.sendStatus(200)
      const subtype = event ? event.subtype : null

      if (subtype !== SlackEventSubtype.botMessage) {
        const commandHandlerFactory =
          new SlackCommandHandlerFactory(slackEventInfo)

        const handler = commandHandlerFactory.createSlackCommandHandler()

        handler.handleCommand()
      }
  }

  @Post('/actions')
  public actions(
    @ResponseDecorator() res: Response,
    @RequestDecorator() { body }: Request) {
    res.status(200).end()

    const { payload } = body as ISlackActionPayload
    if (payload) {
      const slackAction: ISlackAction = JSON.parse(payload)
      const actionHandlerFactory =
        new SlackActionHandlerFactory(slackAction)

      const handler = actionHandlerFactory.createSlackActionHandler()

      handler.handleAction()
    }
  }
}
