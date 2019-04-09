import { MessageAttachment } from "@slack/client"
import { IMessageConsumer, ISlackAction } from "../../controllers/definitions/slackController"
import { SlackResponseType } from "../factories/definitions/slackCommandHandlerFactory"
import SlackClientService from "../services/slackClient"
import TranslationsService from "../services/translationsService"

abstract class BaseSlackActionHandler {
  protected translationsService = new TranslationsService()
  protected slackClientService = new SlackClientService()
  constructor(protected action: ISlackAction) { }


  get userId() {
    return this.action.user.id
  }

  get chanelId() {
    return this.action.channel.id
  }

  get teamId() {
    return this.action.team.id
  }

  get messageConsumer() {
    const messageConsumer: IMessageConsumer = {
      channel: this.chanelId,
      teamId: this.teamId,
      user: this.userId
    }

    return messageConsumer
  }

  public sendMessage(
    text: string,
    consumer: IMessageConsumer,
    type?: SlackResponseType,
    attachments?: MessageAttachment[]
  ): void {
    this.slackClientService.sendMessage(text, consumer, type, attachments)
  }

  public async handleAction(): Promise<void> {
    try {
      await this.onHandleAction()
    } catch ({ message }) {
      this.sendMessage(message, this.messageConsumer)
    }
  }

  public abstract onHandleAction(): void
}

export default BaseSlackActionHandler
