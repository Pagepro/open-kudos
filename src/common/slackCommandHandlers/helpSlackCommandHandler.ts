import { ISlackEventInfo } from "../../controllers/definitions/slackController"
import SlackClientService from "../../services/slackClient"
import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class HelpSlackCommandHandler extends BaseSlackCommandHandler {
  constructor(eventInfo: ISlackEventInfo) {
    super()
    this.eventInfo = eventInfo
  }

  public handleCommand(): void {
    const message = this.translationsService.getTranslation("hereYouWillFindAllCommandsThatYouCanUse")
    SlackClientService.sendMessage(message, this.eventInfo)
  }
}
