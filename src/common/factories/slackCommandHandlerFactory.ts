import { ISlackEventInfo } from "../../controllers/definitions/slackController"
import BalanceSlackCommandHandler from "../slackCommandHandlers/balanceSlackCommandHandler"
import BaseSlackCommandHandler from "../slackCommandHandlers/baseSlackCommandHandler"
import DefaultSlackCommandHandler from "../slackCommandHandlers/defaultSlackCommandHandler"
import GiftsSlackCommandHandler from "../slackCommandHandlers/giftsSlackCommandHandler"
import GiveSlackCommandHandler from "../slackCommandHandlers/giveSlackCommandHandler"
import HelpSlackCommandHandler from "../slackCommandHandlers/helpSlackCommandHandler"
import MemberJoinedCommandHandler from "../slackCommandHandlers/memberJoinedCommandHandler"
import { SlackCommandType } from "./definitions/slackCommandHandlerFactory"


export default class SlackCommandHandlerFactory {
  constructor(private eventInfo: ISlackEventInfo) { }

  private get eventText() {
    return Object.tryGetProperty(
      this.eventInfo,
      e => e.event.text,
      String.empty
    )
  }

  private get commandType() {
    const [, command = String.empty] = this.eventText.split(' ')
    const eventType = this.eventInfo.event.type
    const commandTypeAsString = command || eventType
    const commandType = SlackCommandType[
      commandTypeAsString.toLowerCase() as keyof typeof SlackCommandType
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
      case SlackCommandType.gifts:
        return new GiftsSlackCommandHandler(this.eventInfo)
      case SlackCommandType.member_joined_channel:
        return new MemberJoinedCommandHandler(this.eventInfo)
      default:
        return new DefaultSlackCommandHandler(this.eventInfo)
    }
  }
}
