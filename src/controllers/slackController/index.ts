import {
  Controller,
  Post,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import { Request, Response } from 'express'
import SlackActionHandlerFactory from '../../common/factories/slackActionHandlerFactory'
import SlackCommandHandlerFactory from '../../common/factories/slackCommandHandlerFactory'
import SlackEventHandlerFactory from '../../common/factories/slackEventHandlerFactory'
import {
  ISlackAction,
  ISlackActionPayload,
  ISlackCommandInfo,
  ISlackEventInfo,
  SlackEventSubtype
} from '../definitions/slackController'

@Controller('/slack')
export default class SlackController {
  @Post('/command')
  public command(
    @ResponseDecorator() res: Response,
    @RequestDecorator() { body }: Request) {
    const slackCommandInfo: ISlackCommandInfo = body
    res.send()

    const commandHandlerFactory =
      new SlackCommandHandlerFactory(slackCommandInfo)

    const handler = commandHandlerFactory.createSlackCommandHandler()
    handler.handleCommand()
  }

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
          new SlackEventHandlerFactory(slackEventInfo)

        const handler = commandHandlerFactory.createSlackCommandHandler()

        handler.handleEvent()
      }
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
