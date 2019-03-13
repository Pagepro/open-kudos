import { ISlackEventInfo } from "../../controllers/definitions/slackController"
import BaseSlackCommandHandler from "../slackCommandHandlers/baseSlackCommandHandler"
import DefaultSlackCommandHandler from "../slackCommandHandlers/defaultSlackCommandHandler"
import GiveSlackCommandHandler from "../slackCommandHandlers/giveSlackCommandHandler"
import HelpSlackCommandHandler from "../slackCommandHandlers/helpSlackCommandHandler"
import { SlackCommandType } from "./definitions/slackCommandHandlerFactory"
import BalanceSlackCommandHandler from "../slackCommandHandlers/balanceSlackCommandHandler"


export default class SlackCommandHandlerFactory {
  constructor(private eventInfo: ISlackEventInfo) { }

  private get eventText() {
    try {
      return this.eventInfo.event.text || ''
    } catch (_) {
      return ''
    }
  }

  private get commandType() {
    const [, command = ''] = this.eventText
    const commandType = SlackCommandType[
      command.toLowerCase() as keyof typeof SlackCommandType
    ]

    return commandType
  }

  public createSlackCommandHandler(): BaseSlackCommandHandler {
    switch (this.commandType) {
      case SlackCommandType.give:
        return new GiveSlackCommandHandler(this.eventInfo)
      case SlackCommandType.balance:
        return new BalanceSlackCommandHandler(this.eventInfo)
      case SlackCommandType.help:
        return new HelpSlackCommandHandler(this.eventInfo)
      default:
        return new DefaultSlackCommandHandler()
    }
  }
}
