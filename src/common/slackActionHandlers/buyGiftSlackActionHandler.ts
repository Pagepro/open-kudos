import { SlackResponseType } from "../factories/definitions/slackCommandHandlerFactory"
import BaseSlackActionHandler from "./baseSlackActionHandler"

export default class BuyGiftSlackActionHandler extends BaseSlackActionHandler {
  public onHandleAction(): void {
    this.sendMessage(
      this.translationsService.getTranslation(
        "iCouldntRecognizeThatAction"
      ),
      this.messageConsumer,
      SlackResponseType.hidden,
    )
  }

}
