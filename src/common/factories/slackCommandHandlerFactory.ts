import { ISlackCommandInfo } from "../../controllers/definitions/slackController"
import BalanceSlackCommandHandler from "../slackCommandHandlers/balanceSlackCommandHandler"
import BaseSlackCommandHandler from "../slackCommandHandlers/baseSlackCommandHandler"
import DefaultSlackCommandHandler from "../slackCommandHandlers/defaultSlackCommandHandler"
import GiftsSlackCommandHandler from "../slackCommandHandlers/giftsSlackCommandHandler"
import GiveSlackCommandHandler from "../slackCommandHandlers/giveSlackCommandHandler"
import HelpSlackCommandHandler from "../slackCommandHandlers/helpSlackCommandHandler"
import MemberJoinedCommandHandler from "../slackCommandHandlers/memberJoinedCommandHandler"
import { SlackCommandType } from "./definitions/slackCommandHandlerFactory"


export default class SlackCommandHandlerFactory {
  constructor(private commandInfo: ISlackCommandInfo) { }

  private get commandText() {
    return Object.tryGetProperty(
      this.commandInfo,
      e => e.text,
      String.empty
    )
  }

  private get commandType() {
    const [command = String.empty] = this.commandText.split(' ')
    const commandTypeAsString = command
    const commandType = SlackCommandType[
      commandTypeAsString.toLowerCase() as keyof typeof SlackCommandType
    ]

    return commandType
  }

  public createSlackCommandHandler(): BaseSlackCommandHandler {
    switch (this.commandType) {
      case SlackCommandType.give:
        return new GiveSlackCommandHandler(this.commandInfo)
      case SlackCommandType.balance:
        return new BalanceSlackCommandHandler(this.commandInfo)
      case SlackCommandType.help:
        return new HelpSlackCommandHandler(this.commandInfo)
      case SlackCommandType.gifts:
        return new GiftsSlackCommandHandler(this.commandInfo)
      case SlackCommandType.member_joined_channel:
        return new MemberJoinedCommandHandler(this.commandInfo)
      default:
        return new DefaultSlackCommandHandler(this.commandInfo)
    }
  }
}
