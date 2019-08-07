import { KnownBlock } from "@slack/client"
import axios from 'axios'
import { IMessageConsumer, ISlackActionBlock } from "../../controllers/definitions/slackController"
import { } from "../../models/user.model"
import { SlackResponseType } from "../factories/definitions/slackCommandHandlerFactory"
import LoggerService from "../services/logger"
import SlackClientService from "../services/slackClient"
import TranslationsService from "../services/translationsService"
import UserService from "../services/user"

abstract class BaseSlackActionHandler {
  protected translationsService = new TranslationsService()
  protected slackClientService = new SlackClientService()
  protected logger = new LoggerService()
  protected userService = new UserService()

  constructor(protected action: ISlackActionBlock) { }


  get userId() {
    return this.action.user.id
  }

  get chanelId() {
    return this.action.channel.id
  }

  get teamId() {
    return this.action.team.id
  }

  get responseUrl() {
    return this.action.response_url
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
    blocks?: KnownBlock[]
  ): void {
    this.slackClientService.sendMessage(text, consumer, type, blocks)
  }

  public sendResponse(text: string) {
    axios.post(this.responseUrl,
      {
        text,
        response_type: "ephemeral",
        replace_original: "true"
      },
      {
        headers:
          { 'Content-Type': 'application/json' }
      }
    )
  }

  public async handleAction(): Promise<void> {
    try {
      await this.validate()
      await this.onHandleAction()
    } catch ({ message }) {
      this.sendResponse(message)
    }
  }

  public abstract onHandleAction(): void

  protected async validate(): Promise<void> {
    return
  }
}

export default BaseSlackActionHandler
