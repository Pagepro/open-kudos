import { ISlackEventInfo } from "../../controllers/definitions/slackController"
import BaseSlackEventHandler from "../slackEventHandlers/baseSlackEventHandler"
import DefaultSlackCommandHandler from "../slackEventHandlers/defaultSlackEventHandler"
import MemberJoinedCommandHandler from "../slackEventHandlers/memberJoinedEventHandler"
import { SlackEventType } from "./definitions/slackCommandHandlerFactory"


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
    const eventTypeAsString = this.eventInfo.event.type.toPascalCase()
    const eventType = SlackEventType[
      eventTypeAsString as keyof typeof SlackEventType
    ]

    return eventType
  }

  public createSlackCommandHandler(): BaseSlackEventHandler {
    switch (this.eventType) {
      case SlackEventType.MemberJoinedChannel:
        return new MemberJoinedCommandHandler(this.eventInfo)
      default:
        return new DefaultSlackCommandHandler(this.eventInfo)
    }
  }
}
