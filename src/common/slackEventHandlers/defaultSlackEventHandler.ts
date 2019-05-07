import { SlackResponseType } from "../factories/definitions/slackCommandHandlerFactory"
import BaseSlackEventHandler from "./baseSlackEventHandler"

export default class DefaultSlackEventHandler
  extends BaseSlackEventHandler {
  public onHandleEvent(): void {
    this.sendMessage(
      this.translationsService.getTranslation(
        "iCouldntRecognizeThatCommandPleaseUseHelp"
      ),
      this.messageConsumer,
      SlackResponseType.Hidden,
    )
  }
}
