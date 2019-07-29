import { SlackResponseType } from "../factories/definitions/slackCommandHandlerFactory"
import SlackClientService from "../services/slackClient"
import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class HelpSlackCommandHandler extends BaseSlackCommandHandler {
  protected slackClientService = new SlackClientService()
  public async onHandleCommand(): Promise<void> {
    this.slackClientService.sendMessage(
      this.translationsService.getTranslation(
        "hereYouWillFindAllCommandsThatYouCanUse"
      ),
      await this.getMessageConsumer(),
      SlackResponseType.Hidden
    )
  }
}
