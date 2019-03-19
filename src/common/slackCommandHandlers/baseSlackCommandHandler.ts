import { ISlackEventInfo } from "../../controllers/definitions/slackController"
import SlackClientService from "../../services/slackClient"
import TranslationsService from "../services/translationsService"


abstract class BaseSlackCommandHandler {
  protected translationsService = new TranslationsService()
  protected eventInfo: ISlackEventInfo
  public sendMessage(text: string, eventInfo: ISlackEventInfo): void {
    SlackClientService.sendMessage(text, eventInfo)
  }
  public abstract handleCommand(): void
}

export default BaseSlackCommandHandler
