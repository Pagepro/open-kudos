import { ISlackEventInfo } from "../../controllers/definitions/slackController"
import BaseSlackEventHandler from "../slackEventHandlers/baseSlackEventHandler"
import DefaultSlackCommandHandler from "../slackEventHandlers/defaultSlackEventHandler"
import MemberJoinedCommandHandler from "../slackEventHandlers/memberJoinedEventHandler"
import { SlackCommandType } from "./definitions/slackCommandHandlerFactory"


export default class SlackEventHandlerFactory {
  constructor(private eventInfo: ISlackEventInfo) { }

  private get eventText() {
    return Object.tryGetProperty(
      this.eventInfo,
      e => e.event.text,
      String.empty
    )
  }

  private get eventType() {
    const [, event = String.empty] = this.eventText.split(' ')
    const eventType = this.eventInfo.event.type
    const commandTypeAsString = event || eventType
    const commandType = SlackCommandType[
      commandTypeAsString.toLowerCase() as keyof typeof SlackCommandType
    ]

    return commandType
  }

  public createSlackCommandHandler(): BaseSlackEventHandler {
    switch (this.eventType) {
      case SlackCommandType.member_joined_channel:
        return new MemberJoinedCommandHandler(this.eventInfo)
      default:
        return new DefaultSlackCommandHandler(this.eventInfo)
    }
  }
}
