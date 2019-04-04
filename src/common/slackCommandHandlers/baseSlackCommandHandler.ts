import { MessageAttachment } from "@slack/client"
import { IMessageConsumer, ISlackEventInfo } from "../../controllers/definitions/slackController"
import { SlackResponseType } from "../factories/definitions/slackCommandHandlerFactory"
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

  get messageConsumer() {
    const { team_id, event: { channel, user } } = this.eventInfo
    const messageConsumer: IMessageConsumer = { teamId: team_id, channel, user }
    return messageConsumer
  }

  protected translationsService = new TranslationsService()
  protected slackClientService = new SlackClientService()

  constructor(protected eventInfo: ISlackEventInfo) { }

  public sendMessage(
    text: string,
    consumer: IMessageConsumer,
    type?: SlackResponseType,
    attachments?: MessageAttachment[]
  ): void {
    this.slackClientService.sendMessage(text, consumer, type, attachments)
  }

  public async handleCommand(): Promise<void> {
    try {
      await this.validate()

      await this.onHandleCommand()
    } catch ({ message }) {
      this.sendMessage(message, this.messageConsumer)
    }
  }

  public abstract onHandleCommand(): void

  public getCustomMessageConsumer(
    teamId: string,
    channel: string,
    user?: string
  ): IMessageConsumer {
    return { teamId, channel, user }
  }

  protected async validate(): Promise<void> {
    return
  }
}

export default BaseSlackCommandHandler
