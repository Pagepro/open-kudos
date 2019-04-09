import {
  Controller,
  Post,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import { Request, Response } from 'express'
import SlackCommandHandlerFactory from '../../common/factories/slackCommandHandlerFactory'
import { ISlackEventInfo, SlackEventSubtype } from '../definitions/slackController'

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
  }
}
