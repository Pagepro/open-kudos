import SlackClientService from "../services/slackClient"
import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class HelpSlackCommandHandler extends BaseSlackCommandHandler {
  public onHandleCommand(): void {
    SlackClientService.sendMessage(
      this.translationsService.getTranslation(
        "hereYouWillFindAllCommandsThatYouCanUse"
      ),
      this.eventInfo
    )
  }
}
