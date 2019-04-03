import { ISlackEventInfo } from "../../controllers/definitions/slackController"
import SlackClientService from "../services/slackClient"
import TranslationsService from "../services/translationsService"

abstract class BaseSlackCommandHandler {
  get eventText() {
    const { text } = this.eventInfo.event

    return text
  }

  get senderId() {
    const { user } = this.eventInfo.event

    return user
  }

  get teamId() {
    const { team_id } = this.eventInfo

    return team_id
  }

  protected translationsService = new TranslationsService()
  protected slackClientService = new SlackClientService()

  constructor(protected eventInfo: ISlackEventInfo) { }

  public sendMessage(text: string, eventInfo: ISlackEventInfo): void {
    this.slackClientService.sendMessage(text, eventInfo)
  }

  public async handleCommand(): Promise<void> {
    try {
      await this.validate()

      await this.onHandleCommand()
    } catch ({ message }) {
      this.sendMessage(message, this.eventInfo)
    }
  }

  public abstract onHandleCommand(): void

  protected async validate(): Promise<void> {
    return
  }
}

export default BaseSlackCommandHandler
