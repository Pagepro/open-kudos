import { SlackResponseType } from "../factories/definitions/slackCommandHandlerFactory"
import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class DefaultSlackCommandHandler
  extends BaseSlackCommandHandler {
  public async onHandleCommand(): Promise<void> {
    this.sendMessage(
      this.translationsService.getTranslation(
        "iCouldntRecognizeThatCommandPleaseUseHelp"
      ),
      await this.messageConsumer(),
      SlackResponseType.Hidden,
    )
  }
}
