import { MessageAttachment } from "@slack/client"
import { IMessageConsumer, ISlackEventInfo } from "../../controllers/definitions/slackController"
import { IUser } from "../../models/user.model"
import { SlackResponseType } from "../factories/definitions/slackCommandHandlerFactory"
import LoggerService from "../services/logger"
import SlackClientService from "../services/slackClient"
import TranslationsService from "../services/translationsService"
import UserService from "../services/user"

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
  protected userService = new UserService()
  protected logger = new LoggerService()

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
      this.sendMessage(
        message,
        this.messageConsumer,
        SlackResponseType.hidden
      )
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
