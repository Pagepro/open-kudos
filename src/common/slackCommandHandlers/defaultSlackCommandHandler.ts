import { ISlackEventInfo } from "../../controllers/definitions/slackController"

import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class DefaultSlackCommandHandler extends BaseSlackCommandHandler {
  constructor(eventInfo: ISlackEventInfo) {
    super()
    this.eventInfo = eventInfo
  }
  public handleCommand(): void {
    const message = this.translationsService.getTranslation("iCouldntRecognizeThatCommandPleaseUseHelp")
    this.sendMessage(message, this.eventInfo)
  }
}
