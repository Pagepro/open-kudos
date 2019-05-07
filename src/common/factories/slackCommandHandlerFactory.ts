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
    const commandTypeAsString = command.toPascalCase()
    const commandType = SlackCommandType[
      commandTypeAsString as keyof typeof SlackCommandType
    ]

    return commandType
  }

  public createSlackCommandHandler(): BaseSlackCommandHandler {
    switch (this.commandType) {
      case SlackCommandType.Give:
        return new GiveSlackCommandHandler(this.commandInfo)
      case SlackCommandType.Balance:
        return new BalanceSlackCommandHandler(this.commandInfo)
      case SlackCommandType.Help:
        return new HelpSlackCommandHandler(this.commandInfo)
      case SlackCommandType.Gifts:
        return new GiftsSlackCommandHandler(this.commandInfo)
      default:
        return new DefaultSlackCommandHandler(this.commandInfo)
    }
  }
}
